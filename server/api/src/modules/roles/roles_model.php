<?php

class RolesModel extends BaseModel
{
    public function __construct() {
        parent::__construct();
        $this->table = 'roles';
    }

    public function get_roles(){
        return $this->getAll();
    }

    public function get_rol_by_id($id){
        return $this->get_by_field ('id', $id);
    }
}