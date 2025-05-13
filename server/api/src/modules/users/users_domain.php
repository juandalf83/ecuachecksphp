<?php

class UsersDomain 
{
    private $users_model;
    private $companies_model;

    public function __construct() {
        $this->users_model = new UsersModel();
        $this->companies_model = new CompaniesModel();
    }
    
    public function update_status($data){
        $user = $this->users_model->get_user_by_token($data['author_id']);
        if($user['status'] == 1){
            return $this->users_model->update_status($data['id'], $data['status'], $user['text']->id);
        }
        return $user;
    }

    public function save($data){
        $user = $this->users_model->get_user_by_token($data['author_id']);
        if($user['status'] == 1){
            if($data['id'] == '0'){
                if($this->users_model->exists_user_by_email($data['data']['email'])){
                    $result = $this->users_model->sendMessage(0, 'El correo electronico ya esta asociado a otro usuario');
                }else{
                    $result = $this->create_user($data['data'], $user['text']->id);
                }
            }else{
                $result = $this->update_user($data['id'], $data['data'], $user['text']->id);
            }
            return $result;
        }
        return $user;
    }

    public function save_my_account($data){
        $user = $this->users_model->get_user_by_token($data['token']);
        if($user['status'] == 1){
            $company_data = array(
                'name' => $data['data']['company_name'], 
                'status' => 1 
            );
            $this->companies_model->update('id', $data['company_id'], $company_data, $user['text']->id);
            return $this->update_user($user['text']->id, $data['data'], $user['text']->id);
        }
        return $user;
    }

    public function reset_password($data){
        $user = $this->users_model->get_user_by_token($data['author_id']);
        if($user['status'] == 1){
            $passwordRandom = $this->users_model->get_random_password();
            $password = password_hash($passwordRandom, PASSWORD_BCRYPT);
            $data_password = array('password' => $password);
            $user_update = $this->users_model->update('id', $user['text']->id, $data_password, $user['text']->id);
            if($user_update['status'] == 1){
                $this->back_access($user['text']->email, $passwordRandom);
                $this->send_mail_reset_password($user['text']->email, $passwordRandom);
            }
            return $user_update;
        }
        return $user;
    }

    protected function create_user($data, $author_id){
        $passwordRandom = $this->users_model->get_random_password();
        $password = password_hash($passwordRandom, PASSWORD_BCRYPT);
        $user_data = array(
            'email' => $data['email'], 
            'password' => $password, 
            'token' => '',
            'phone' => $data['phone'], 
            'company_id' => $data['company_id'], 
            'rol_id' => $data['rol_id'], 
            'status' => 1,
        );
        $result = $this->users_model->insert($user_data, $author_id);
        if($result['status'] == 1){
            $this->send_mail_reset_password($data['email'], $passwordRandom);
        }
        return $result;
    }

    protected function update_user($id, $data, $author_id){
        $password = '';
        $user_data = array('phone' => $data['phone']);
        if($data['active_pass']){
            $password = password_hash($data['password'], PASSWORD_BCRYPT);
            $user_data = array(
                'phone' => $data['phone'], 
                'password' => $password, 
            );
        }
        return $this->users_model->update('id', $id, $user_data, $author_id);
    }

    protected function send_mail_reset_password($email, $password){
        $html = file_get_contents(__DIR__."/../../../../../email/user.html");
        preg_match_all('[@@.*?@@]', $html, $coincidencias);
        $mensaje = str_replace($coincidencias[0][0], $email, $html);
        $mensaje = str_replace($coincidencias[0][1], $password, $html);
        // Para enviar un correo HTML, debe establecerse la cabecera Content-type
        $cabeceras = 'From: Empresa <evaluaciones@grupotoledo.ec>' . "\r\n";
        $cabeceras .= 'MIME-Version: 1.0' . "\r\n";
        $cabeceras .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
        // Enviarlo
        mail($email, 'Acceso al sistema ecuachecks', $mensaje, $cabeceras);
    }
}