import React, { useCallback, useEffect } from "react";
import { Container, Link } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { setActiveTab, setSidebarOpen } from "../../context/ui-actions";
import { useUiContext } from "../../hooks/use-ui-context";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2, 1),
  },
}));

export function Legal() {
  const classes = useStyles();
  const { sidebarOpen, dispatch } = useUiContext();

  useEffect(() => {
    dispatch(setActiveTab(-1));
  }, [dispatch]);

  const dispatchSidebarState = useCallback(
    function (args) {
      dispatch(setSidebarOpen(args));
    },
    [dispatch]
  );

  function closeSidebar() {
    if (sidebarOpen) {
      dispatchSidebarState(false);
    }
  }

  return (
    <Container
      maxWidth="md"
      classes={{ root: classes.root }}
      onClick={closeSidebar}
    >
      <Typography color="textSecondary" variant="h3" component="h1">
        Legal Disclosure
      </Typography>
      <Typography
        color="textSecondary"
        variant="caption"
        component="p"
        gutterBottom
      >
        Information in accordance with Section 5 TMG
      </Typography>
      <Typography color="textSecondary" variant="body1" component="p">
        Marco Leko
      </Typography>
      <Typography color="textSecondary" variant="body1" component="p">
        Putzbrunnerstraße, 130a, <br />
        85521 Ottobrunn, <br />
        Deutschland
      </Typography>
      <Typography
        color="textSecondary"
        variant="h4"
        component="h2"
        gutterBottom
      >
        Contact Information
      </Typography>
      <Typography color="textSecondary" variant="body1" component="p">
        <strong>Tel.:</strong> 017642013393
        <br />
        <strong>E-Mail:</strong>{" "}
        <Link href="mailto:leko.marco@outlook.com">
          leko.marco(at)outlook.com
        </Link>
        <br />
        <strong>Internet address:</strong>{" "}
        <Link href="https://eduinsights.eu">https://eduinsights.eu</Link>
      </Typography>
      <Typography
        color="textSecondary"
        variant="h4"
        component="h2"
        gutterBottom
      >
        Graphics and Image Sources
      </Typography>
      <Typography color="textSecondary" variant="body2" component="p">
        www.flaticon.com
      </Typography>
      <Typography
        color="textSecondary"
        variant="h4"
        component="h2"
        gutterBottom
      >
        Disclaimer
      </Typography>
      <Typography color="textSecondary" variant="body2" component="p">
        Accountability for content The contents of our pages have been created
        with the utmost care. However, we cannot guarantee the contents'
        accuracy, completeness or topicality. According to statutory provisions,
        we are furthermore responsible for our own content on these web pages.
        In this matter, please note that we are not obliged to monitor the
        transmitted or saved information of third parties, or investigate
        circumstances pointing to illegal activity. Our obligations to remove or
        block the use of information under generally applicable laws remain
        unaffected by this as per §§ 8 to 10 of the Telemedia Act (TMG).
      </Typography>
      <br />
      <Typography color="textSecondary" variant="body2" component="p">
        Accountability for links Responsibility for the content of external
        links (to web pages of third parties) lies solely with the operators of
        the linked pages. No violations were evident to us at the time of
        linking. Should any legal infringement become known to us, we will
        remove the respective link immediately.
      </Typography>
      <br />
      <Typography color="textSecondary" variant="body2" component="p">
        Copyright Our web pages and their contents are subject to German
        copyright law. Unless expressly permitted by law, every form of
        utilizing, reproducing or processing works subject to copyright
        protection on our web pages requires the prior consent of the respective
        owner of the rights. Individual reproductions of a work are only allowed
        for private use. The materials from these pages are copyrighted and any
        unauthorized use may violate copyright laws.
      </Typography>
    </Container>
  );
}
