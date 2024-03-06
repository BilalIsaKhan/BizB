import React, { Component } from "react";
import PropTypes from "prop-types";
import Hidden from "@material-ui/core/Hidden";
import { withStyles } from "@material-ui/core/styles";
import Header from "components/Header";
import Footer from "components/Footer";

const styles = (theme) => ({
  root: {
    minHeight: "100vh",
  },
  main: {
    flex: "1 1 auto",
    maxWidth: "100%",
  },
  article: {
    padding: theme.spacing(0),
  },
  padding: {
    paddingBottom: "120px",
    [theme.breakpoints.down("xs")]: {
      paddingBottom: "0",
    },
  }
});

class Layout extends Component {
  static propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object,
    headerType: PropTypes.bool,
    shop: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
    tags: PropTypes.arrayOf(),
    viewer: PropTypes.object,
  };

  static defaultProps = {
    classes: {},
  };

  render() {
    const { classes, children, shop, viewer, headerType, tags } = this.props;
    return (
      <React.Fragment>
        <div className={classes.root}>
          <Hidden mdUp>
            <div className={classes.padding}>

              <Header shop={shop} viewer={viewer} headerType={0} tags={tags} />
            </div>
          </Hidden>
          <Hidden smDown>
            <Header shop={shop} viewer={viewer} headerType={headerType} tags={tags} />
          </Hidden>
          {/* <Header shop={shop} viewer={viewer} headerType={headerType} /> */}
          <main className={classes.main}>
            <article className={classes.article}>{children}</article>
          </main>
          <Footer />
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Layout);
