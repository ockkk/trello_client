import React from 'react';
import { UncontrolledDropdown,Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const todoList = () => {
  return (
    <div>
    <UncontrolledDropdown>
      <DropdownToggle caret>
        Boards
        </DropdownToggle>
      <DropdownMenu>
      <DropdownItem>Another Action</DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
    </div>
  );
};

export default todoList;