<?php

class CompaniesRulesModel extends BaseModel
{
    public function __construct() {
        parent::__construct();
        $this->table = 'companies_rules';
    }

    public function get_rule_by_id($id){
        return $this->get_by_field ('id', $id);
    }

    public function get_rules_company($consultation_id, $company_id){
        $sql = "SELECT cr.id, cr.consultations_items_id, ci.name AS consultations_items_name, 
                ci.group, cr.alert, cr.review, cr.clean, cr.informative
                FROM companies_rules cr, consultations_items ci 
                WHERE cr.consultations_items_id = ci.id
                AND ci.status = 1 
                AND ci.consultations_id = :consultation_id 
                AND cr.company_id = :company_id";
        try{
            $row = $this->conection->prepare($sql);
            if ($row->execute(array('consultation_id' => $consultation_id, 'company_id' => $company_id))) {
                if($row->rowCount() > 0){
                    $records = $row->fetchAll(PDO::FETCH_OBJ);
                    $return = $this->sendMessage(1, $records);                
                }else{
                    $return = $this->sendMessage(0, 'No existe registros en la base de datos');
                }
            }
            $row = null;
            $this->db = null;
        }catch(PDOException $e){
            $return = $this->sendMessage(0, $e->getMessage());
        }
        return $return;
    }
}