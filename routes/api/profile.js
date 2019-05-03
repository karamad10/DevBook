const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const passport = require("passport");

//load validation
const validateProfileInput = require("../../validation/profile");
const validateExperinceInput = require("../../validation/experince");
const validateEducatoinInput = require("../../validation/education");

//load Profile module
const profile = require("../../modules/Profile");

//load User module
const user = require("../../modules/User");

//@route    GET api/profile/test
//@desc     Tests profile route
//@access   Public
router.get("/test", (req, res) =>
  res.json({
    message: "Profile is working"
  })
);

//@route    GET api/profile
//@desc     get current user profile
//@access   Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "there is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

//@route    GET api/profile/all
//@desc     Get all profiles
//@access   Public
router.get("/all", (req, res) => {
  const errors = {};

  profile
    .find()
    .populate("user", ["name", "avatar"])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = "there are no profiles";
        return res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch(err => res.status(404).json({ profile: "there are no profiles" }));
});

//@route    GET api/profile/handle/:handle
//@desc     Get profile by handle
//@access   Public
router.get("/handle/:handle", (req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "there is no profile for this user";
        res.status(400).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

//@route    GET api/profile/user/:user_id
//@desc     Get profile by user id
//@access   Public
router.get("/user/:user_id", (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "there is no profile for this user";
        res.status(400).json(errors);
      }
      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: "there is no profile for this user" })
    );
});

//@route    GET api/profile
//@desc     create or edit user profile
//@access   Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    //check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    //Get fields
    profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.bio) profileFields.bio = req.body.bio;

    if (req.body.githubusername) {
      profileFields.githubusername = req.body.githubusername;
    }

    //skills comes as csv so we have to split into an array
    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }
    //social is an object of arrays.
    /* initialize an empty object called social to take all
    the original properties and store them in an object */
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // profile exists so we update it
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        //profile does not exist so we create a new profile
        //check if handle exists, the handle(somewhat like a username) must be unique for each profile
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "this handle already exists";
            res.send(400).json(errors);
          }
          //if profile does not exists we save it as new one
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

//@route    Post api/profile/experince
//@desc     add experince tp profile
//@access   Private
router.post(
  "/experince",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperinceInput(req.body);
    //check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const body = req.body;
      const newExp = {
        title: body.title,
        company: body.company,
        locatoin: body.locatoin,
        from: body.from,
        to: body.to,
        current: body.current,
        description: body.description
      };

      //Add to experince array
      profile.experince.unshift(newExp);
      profile.save().then(profile => res.json(profile));
    });
  }
);

//@route    Post api/profile/education
//@desc     add education to profile
//@access   Private
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducatoinInput(req.body);
    //check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      //Add to education array
      profile.education.unshift(newEdu);
      profile.save().then(profile => res.json(profile));
    });
  }
);

//@route    Delete api/profile/experince:/exp_id
//@desc     Delete experince from profile
//@access   Private
router.delete(
  "/experince/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      //get remove index
      console.log(profile);
      const removeIndex = profile.experince
        .map(item => item.id)
        .indexOf(req.params.exp_id);
      //remove the wanted index from array
      profile.experince.splice(removeIndex, 1);
      //save
      profile;
      profile
        .save()
        .then(profile => res.json(profile))
        .catch(err => res.status(404).json(err));
    });
  }
);

//@route    Delete api/profile/education:/edu_id
//@desc     Delete education from profile
//@access   Private
router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      //get remove index
      console.log(profile);
      const removeIndex = profile.education
        .map(item => item.id)
        .indexOf(req.params.edu_id);
      //remove the wanted index from array
      profile.education.splice(removeIndex, 1);
      //save
      profile;
      profile
        .save()
        .then(profile => res.json(profile))
        .catch(err => res.status(404).json(err));
    });
  }
);

//@route    Delete api/profile/profile
//@desc     Delete user and profile
//@access   Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      user.findOneAndRemove({ _id: req.user.id }).then(() => {
        res.json({ success: true });
      });
    });
  }
);
module.exports = router;
