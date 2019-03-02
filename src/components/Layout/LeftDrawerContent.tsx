import { List, Slide } from "@material-ui/core";
import ComponentsIcon from "@material-ui/icons/CategoryOutlined";
import ComponentsIconActive from "@material-ui/icons/CategoryTwoTone";
import ProductsIcon from "@material-ui/icons/LocalOfferOutlined";
import ProductsIconActive from "@material-ui/icons/LocalOfferTwoTone";
import AdminToolsIcon from "@material-ui/icons/LockOutlined";
import AdminToolsIconActive from "@material-ui/icons/LockTwoTone";
import SitesIcon from "@material-ui/icons/StorageOutlined";
import SitesIconActive from "@material-ui/icons/StorageTwoTone";
import SettingsIcon from "@material-ui/icons/SettingsOutlined";
import SettingsIconActive from "@material-ui/icons/SettingsTwoTone";
import ProfileIcon from "@material-ui/icons/AccountCircleOutlined";
import ProfileIconActive from "@material-ui/icons/AccountCircleTwoTone";
import React from "react";
import ListItemNavLink from "./ListItemNavLink";

const LeftDrawerContent: React.FunctionComponent = () => {
  return (
    <Slide direction="right" in={true}>
      <List>
        <ListItemNavLink
          to="/profile"
          primary="My Profile"
          icon={<ProfileIcon />}
          activeIcon={<ProfileIconActive />}
        />
        <ListItemNavLink
          to="/sites"
          primary="My Sites"
          icon={<SitesIcon />}
          activeIcon={<SitesIconActive />}
        />
        <ListItemNavLink
          to="/products"
          primary="Products"
          icon={<ProductsIcon />}
          activeIcon={<ProductsIconActive />}
        />
        <ListItemNavLink
          to="/components"
          primary="Components"
          icon={<ComponentsIcon />}
          activeIcon={<ComponentsIconActive />}
        />
        <ListItemNavLink
          to="/settings"
          primary="Settings"
          icon={<SettingsIcon />}
          activeIcon={<SettingsIconActive />}
        />
        <ListItemNavLink
          to="/admin"
          primary="Admin Tools"
          icon={<AdminToolsIcon />}
          activeIcon={<AdminToolsIconActive />}
        />
      </List>
    </Slide>
  );
};

export default LeftDrawerContent;
