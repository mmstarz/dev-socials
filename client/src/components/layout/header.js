import React from 'react'
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "57px",  
  },
}));

const Header = () => {
    const classes = useStyles()

    return (
        <div className={classes.root} >
            
        </div>
    )
}

export default Header
