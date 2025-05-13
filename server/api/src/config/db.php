<?php
// class DB {
//     private $dbHost = 'localhost';
//     private $dbUser = 'root';
//     private $dbPass = '';
//     private $dbName = 'ecuachecks';

//     public function conectionDB(){
//         $mysqlConnet = "mysql:host=$this->dbHost;dbname=$this->dbName";
//         $dbConection = new PDO($mysqlConnet, $this->dbUser, $this->dbPass, 
//             array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"));
//         $dbConection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
//         return $dbConection;
//     }
// }
class DB {
    // private $dbHost = 'localhost';
    private $dbHost = '23.145.120.242';
    private $dbUser = 'ecuachec_user';
    private $dbPass = 'b%_ihCZd]wNI';
    private $dbName = 'ecuachec_prueba';

    public function conectionDB(){
        $mysqlConnet = "mysql:host=$this->dbHost;dbname=$this->dbName";
        $dbConection = new PDO($mysqlConnet, $this->dbUser, $this->dbPass, 
            array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"));
        $dbConection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $dbConection;
    }
}