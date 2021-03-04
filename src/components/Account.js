import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

function Account(props) {
  const { users, curUser, onChange } = props;
  const item = users.map((i) => {
    return (
      <MenuItem key={i} value={i.id}>
        {i.firstName}
      </MenuItem>
    );
  });

  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <header>
      <div className='user'>
        <Avatar aria-label='recipe' className='avatar'>
          U
        </Avatar>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          className='font-color'
          value={curUser}
          onChange={handleChange}>
          {item}
        </Select>
      </div>
    </header>
  );
}

export default Account;
