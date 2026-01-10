import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import {Paper, Typography} from "@mui/material";
import React from "react";
import LayoutContain from "../components/LayoutContain";

const Notifications: React.FC = () => {
  return (
    <LayoutContain sx={{paddingY: 4}}>
      <Paper
        elevation={0}
        sx={{
          padding: 4,
          textAlign: "center",
        }}
      >
        <NotificationsNoneIcon
          sx={{fontSize: "4rem", color: "#86A1FF", marginBottom: 2}}
        />
        <Typography
          noWrap={true}
          variant="h4"
          sx={{color: "#ffffff", marginBottom: 1, fontWeight: 600}}
        >
          Notifications
        </Typography>
        <Typography
          color="primary.contrastText"
          noWrap={true}
          variant="body2"
          sx={{color: "#65676b"}}
        >
          You're all caught up
        </Typography>
      </Paper>
    </LayoutContain>
  );
};

export default React.memo(Notifications);
