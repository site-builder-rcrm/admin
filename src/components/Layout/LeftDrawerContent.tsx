import { List, Slide } from "@material-ui/core";
import {
  SignalWifi1BarOutlined,
  SignalWifi1BarTwoTone
} from "@material-ui/icons";
import ProfileIcon from "@material-ui/icons/AccountCircleOutlined";
import ProfileIconActive from "@material-ui/icons/AccountCircleTwoTone";
import AdminToolsIcon from "@material-ui/icons/LockOutlined";
import AdminToolsIconActive from "@material-ui/icons/LockTwoTone";
import SettingsIcon from "@material-ui/icons/SettingsOutlined";
import SettingsIconActive from "@material-ui/icons/SettingsTwoTone";
import SitesIcon from "@material-ui/icons/StorageOutlined";
import SitesIconActive from "@material-ui/icons/StorageTwoTone";
import React from "react";
import ListItemNavLink from "./ListItemNavLink";

const LeftDrawerContent: React.FunctionComponent = () => {
  return (
    <Slide direction="right" in={true}>
      <List>
        <ListItemNavLink
          to="/profile"
          primary="Profile"
          icon={<ProfileIcon />}
          activeIcon={<ProfileIconActive />}
        />
        <ListItemNavLink
          to="/sites"
          primary="Sites"
          icon={<SitesIcon />}
          activeIcon={<SitesIconActive />}
        />
        <ListItemNavLink
          to="/funnels"
          primary="Funnels"
          icon={<SignalWifi1BarOutlined />}
          activeIcon={<SignalWifi1BarTwoTone />}
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
