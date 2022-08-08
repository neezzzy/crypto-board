import React from "react";
import { Form, FormControl, Button } from "react-bootstrap";

import { AiOutlineSearch } from "react-icons/ai";

export default function Search() {
  return (
    <Form className="d-flex w-25 gap-2">
      <FormControl type="text" placeholder="Search coin..." />
      <Button className="btn btn-primary btn-lg">
        <AiOutlineSearch size="2rem"/>
      </Button>
    </Form>
  );
}
