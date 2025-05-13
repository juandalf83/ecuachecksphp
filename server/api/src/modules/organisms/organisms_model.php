<?php

class OrganismsModel extends BaseModel
{
    public function __construct() {
        parent::__construct();
        $this->table = 'organisms';
    }

    public function get_organisms(){
        return $this->getAll();
    }
    
}