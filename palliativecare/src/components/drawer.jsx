import { useState, useEffect, Fragment } from "react";
import { Route, Routes, BrowserRouter,  useNavigate } from 'react-router-dom';
import { auth } from "../service/firebaseservice";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faQuestionCircle, faBook, faHeadset, faShieldAlt, faCog, faSignOutAlt, faStar } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";

const DrawerWithNavigation = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  const [email, setEmail] = useState("");


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setEmail(user.email);
      } else {
        setEmail(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleFAQsClick = () => {
    navigate('/faqs');
    closeDrawer();
  };

  const handleUserGuidesClick = () => {
    navigate('/user-guides');
    closeDrawer();
  };

  const handleCustomerSupportClick = () => {
    navigate('/customer-support');
    closeDrawer();
  };

  const handlePrivacyPolicyClick = () => {
    navigate('/privacy-policy');
    closeDrawer();
  };

  const handleAppVersionClick = () => {
    navigate('/app-version');
    closeDrawer();
  };

  const handleFeedbackClick = () => {
  navigate('/feedback');
    closeDrawer();
  };

  const handleLogoutClick = () => {
    auth.signOut().then(() => {
      // Successfully logged out
    }).catch((error) => {
      alert("Error occurred during logout: " + error.message);
    });
  };

  return (
    <Fragment>
      <div onClick={openDrawer}>
        <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
      </div>
      <Drawer open={open} onClose={closeDrawer}>
        <div className="flex items-center justify-between p-4">
          <Typography variant="h5" color="blue-gray">
            Palliative Care
          </Typography>
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <FontAwesomeIcon icon={faTimes} className="h-6 w-6" />
          </IconButton>
        </div>
        <List>
          <ListItem onClick={handleFAQsClick}>
            <ListItemPrefix>
              <FontAwesomeIcon icon={faQuestionCircle} className="h-5 w-5" />
            </ListItemPrefix>
            FAQs
          </ListItem>
          <ListItem onClick={handleUserGuidesClick}>
            <ListItemPrefix>
              <FontAwesomeIcon icon={faBook} className="h-5 w-5" />
            </ListItemPrefix>
            User Guides/Tutorials
          </ListItem>
          <ListItem onClick={handleCustomerSupportClick}>
            <ListItemPrefix>
              <FontAwesomeIcon icon={faHeadset} className="h-5 w-5" />
            </ListItemPrefix>
            Customer Support
          </ListItem>
          <ListItem onClick={handlePrivacyPolicyClick}>
            <ListItemPrefix>
              <FontAwesomeIcon icon={faShieldAlt} className="h-5 w-5" />
            </ListItemPrefix>
            Privacy Policy and Terms of Service
          </ListItem>
          <ListItem onClick={handleAppVersionClick}>
            <ListItemPrefix>
              <FontAwesomeIcon icon={faCog} className="h-5 w-5" />
            </ListItemPrefix>
            App Version and Updates
          </ListItem>
          <ListItem onClick={handleFeedbackClick}>
            <ListItemPrefix>
              <FontAwesomeIcon icon={faStar} className="h-5 w-5" />
            </ListItemPrefix>
            Feedback and Ratings
          </ListItem>
        </List>
        <div className="mt-auto px-4">
          <div className="flex space-x-4 mt-4">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebook} className="text-3xl text-blue-500 hover:text-blue-700" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} className="text-3xl text-blue-400 hover:text-blue-600" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} className="text-3xl text-pink-500 hover:text-pink-700" />
            </a>
          </div>
          <Button className="bg-mypink mt-4" buttonType="filled" size="regular" rounded={false} block={false} iconOnly={false} ripple="light" onClick={handleLogoutClick}>
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
            Logout
          </Button>
        </div>
      </Drawer>
    </Fragment>
  );
};

export default DrawerWithNavigation;
