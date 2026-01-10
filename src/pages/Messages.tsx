import MailOutlineIcon from "@mui/icons-material/MailOutline";
import {Paper, Typography} from "@mui/material";
import React from "react";
import LayoutContain from "../components/LayoutContain";

const Messages: React.FC = () => {
  return (
    <LayoutContain sx={{paddingY: 4}}>
      <Paper
        elevation={0}
        sx={{
          padding: 4,
          textAlign: "center",
        }}
      >
        <MailOutlineIcon
          sx={{fontSize: "4rem", color: "#86A1FF", marginBottom: 2}}
        />
        <Typography
          noWrap={true}
          variant="h4"
          sx={{color: "#ffffff", marginBottom: 1, fontWeight: 600}}
        >
          Messages
        </Typography>
        <Typography
          color="primary.contrastText"
          noWrap={true}
          variant="body2"
          sx={{color: "#65676b"}}
        >
          Start a conversation with your friends
        </Typography>
      </Paper>
    </LayoutContain>
  );
};

export default React.memo(Messages);
