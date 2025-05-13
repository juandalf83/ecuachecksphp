<body>
    <div class="container-principal">
        <div style=" padding: 20px 0px;">
            <div>
                <div style="float: left; width: 4%;">
                    <img src="https://grupotoledo.ec/sistema/client1/assets/img/logo-ecuachecks-icono.svg"
                        width="20"
                    />
                </div>
                <div style="float: left;width: 20%;margin-left: 15px;">
                    <img src="https://grupotoledo.ec/sistema/client1/assets/img/logo-ecuachecks-letras.svg"
                        width="130"
                    />
                </div>
                <div style="float: left;width: 73%;text-align: right;">
                    <div><strong>Background Check</div>
                </div>
            </div>
        </div>
        <div class="block-header">
            <div>
                <div style="float: left; width: 33%;">
                    <div style="font-size: 0.8em;"><strong>Persona consultada:</strong></div>
                    <div class="text-result-principal"><?=$register->name?></div>
                </div>
                <div style="float: left; width: 33%;">
                    <div style="font-size: 0.8em;"><strong>N° de identificación:</strong></div>
                    <div class="text-result-principal"><?=$register->document?></div>
                </div>
                <div style="float: left; width: 33%;text-align: right;padding-top: 10px;">
                    <div><strong>Fecha de consulta:</strong> <?=$date_str?></div>
                    <!-- <div><strong>Fecha de consulta:</strong> 15 de enero de 2024</div> -->
                </div>
            </div>
        </div>
        <div class="block-body">
            <div class="title-block">Resumen de consultas</div>
            <div>
                <div class="head-row">
                    <div style="float: left; width: 30%;">Organismo de control</div>
                    <div style="float: left; width: 35%;">Consulta realizada</div>
                    <div style="float: left; width: 24%;">Nota</div>
                    <div style="float: left; width: 10%;">Mensaje</div>
                </div>
                <div class="body-section">
                    <?php foreach ($control_organisms as $row){ ?>
                        <?php if($row === end($control_organisms)){ ?>
                            <div class="body-row">
                        <?php }else{ ?>
                            <div class="body-row" style="border-bottom: solid 2px #43526E">
                        <?php }?>
                            <div style="float: left; width: 30%;"><?=$row->organims?></div>
                            <div style="float: left; width: 35%;"><?=$row->consultation?></div>
                            <div style="float: left; width: 24%;"><?=$row->note ? $row->note : ' - '?></div>
                            <div style="float: left; width: 10%;">
                                <?php if ($row->message != ''){ ?>
                                    <?php foreach ($types_alerts_message as $types_alert){ ?>
                                        <?php if ($row->message == $types_alert['type']){ ?>
                                            <span style="color: <?=$types_alert['color']?>"><?=$row->message?></span>
                                        <?php }?>
                                    <?php }?>
                                <?php }else{ ?>
                                    <span> - </span>
                                <?php }?>
                            </div>
                        </div>
                    <?php }?>
                </div>
            </div>
        </div>
        <?php foreach ($control_organisms as $control_organism){ ?>
            <?php if ($control_organism->field == 'min_interior' && $control_organism->status == 'finished'){ ?>
                <div class="block-body">
                    <div class="title-block"><?=$control_organism->name?></div>
                    <div>
                        <div class="head-row">
                            <div style="float: left; width: 40%;">Nombre</div>
                            <div style="float: left; width: 20%;">Tipo de documento</div>
                            <div style="float: left; width: 20%;">Número de documento</div>
                            <div style="float: left; width: 20%;">Posee antecedentes</div>
                        </div>
                        <div class="body-section">
                            <?php foreach($register->min_interior as $item){ ?>
                                <div class="body-row">
                                    <div style="float: left; width: 40%;"><?=$item->name?></div>
                                    <div style="float: left; width: 20%;"><?=$item->id_number?></div>
                                    <div style="float: left; width: 20%;"><?=$item->doc_type?></div>
                                    <div style="float: left; width: 20%;"><?=$item->background?></div>
                                </div>
                            <?php }?>
                    </div>
                </div>
            <?php }?>
            <?php if ($control_organism->field == 'exit_impediment' && $control_organism->status == 'finished'){ ?>
                <div class="block-body">
                    <div class="title-block"><?=$control_organism->name?></div>
                    <div>
                        <div class="head-row">
                            <div style="float: left; width: 40%;">Apellidos y nombres</div>
                            <div style="float: left; width: 30%;">Nacionalidad</div>
                            <div style="float: left; width: 30%;">Tiene impedimento</div>
                        </div>
                        <div class="body-section">
                            
                            <div class="body-row">
                                <div style="float: left; width: 40%;"><?=$register['exit_impediment']['names']?></div>
                                <div style="float: left; width: 30%;"><?=$register['exit_impediment']['nationality']?></div>
                                <div style="float: left; width: 30%;"><?=$register['exit_impediment']['has_impediment'] or 'Sin registros encontrados'?></div>
                            </div>
                        </div>
                    </div>
                </div>
            <?php }?>
            <?php if ($control_organism->field == 'supa' && $control_organism->status == 'finished'){ ?>
                <?php if (isset($register->criminal_record) && isset($register->exit_impediment)){ ?>
                    <div style="margin-top: 3cm;"></div>
                <?php }?>
                <div class="block-body">
                    <div class="title-block"><?=$control_organism->name?></div>
                    <?php foreach($register->supa as $item){ ?>
                        <div>
                            <div class="head-row">
                                <div style="float: left; width: 10%;">Cod. tarjeta</div>
                                <div style="float: left; width: 9%;">No. Proceso</div>
                                <div style="float: left; width: 25%;">Dependencia Jurisdiccional</div>
                                <div style="float: left; width: 15%;">Tipo de pensión</div>
                                <div style="float: left; width: 40%;">Intervinientes</div>
                            </div>
                            <div class="body-section">
                                <div class="body-row">
                                    <div style="float: left; width: 10%;"><?=$item->card_code?></div>
                                    <div style="float: left; width: 9%;"><?=$item->judicial_process?></div>
                                    <div style="float: left; width: 25%;padding-right: 5px"><?=$item->jurisdictional_depency?></div>
                                    <div style="float: left; width: 15%;"><?=$item->type_alimony?></div>
                                    <div style="float: left; width: 40%;">
                                        <?php foreach ($item->participants as $participant){ ?>
                                            <div>
                                                <?php foreach ($header_participants as $header){ ?>
                                                    <div>
                                                        <span style="color:#000"><?=$header['title']?></span>
                                                        <span style="margin-right: 10px;"><?=$participant->{$header['field']}?></span>
                                                    </div>
                                                <?php }?>
                                            </div>
                                        <?php }?>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <?php } ?>
                </div>
            <?php }?>
            <?php if ($control_organism->field == 'expel' && $control_organism->section == 1 && $control_organism->status == 'finished') {?>
                <div class="block-body">
                    <div class="title-block"><?=$control_organism->name?></div>
                    <?php if (sizeof($register->expel_demanding) > 0){ ?>
                        <div>
                            <?php foreach ($register->expel_demanding as $process ){ ?>
                                <div>
                                    <div>
                                        <div class="head-row">
                                            <div style="float: left; width: 30%;">Fecha de ingreso</div>
                                            <div style="float: left; width: 30%;">No. Proceso</div>
                                            <div style="float: left; width: 40%;">Número de documento</div>
                                        </div>
                                        <div class="body-section">
                                            <div class="body-row">
                                                <div style="float: left; width: 30%;"><?=$process->entry_date?></div>
                                                <div style="float: left; width: 30%;"><?=$process->no_process?></div>
                                                <div style="float: left; width: 40%;"><?=$process->crime_issue?></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div style="margin-bottom: 20px;">
                                        <div style="margin-bottom: 10px; font-weight: bold;">Detalle del proceso</div>
                                        <div>
                                            <div style="font-size: 0.9em;">
                                                <table>
                                                    <tr>
                                                        <td>Materia:</td>
                                                        <td><?=$process->matter?></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Delito/Asunto:</td>
                                                        <td><?=$process->crime_issue?></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Tipo de acción:</td>
                                                        <td><?=$process->action_type?></td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="head-row">
                                            <div style="float: left; width: 5%;">No.</div>
                                            <div style="float: left; width: 15%;">Fecha</div>
                                            <div style="float: left; width: 40%;">Actores/ Ofendidos</div>
                                            <div style="float: left; width: 40%;">Demandados/ Procesados</div>
                                        </div>
                                        <?php foreach ($process->movements as $subject){ ?>
                                            <div class="body-section">
                                                <div class="body-row-header">
                                                    <div>
                                                        <strong>Dependencia jurisdiccional:</strong>
                                                        <span><?=$subject->jurisdiction?></span>
                                                    </div>
                                                    <div>
                                                        <strong>Ciudad:</strong>
                                                        <span><?=$subject->city?></span>
                                                    </div>
                                                </div>
                                                <?php foreach ($subject->incidents as $indexI => $item){ ?>
                                                    <?php if($item === end($subject->incidents)){ ?>
                                                        <div class="body-row">
                                                    <?php }else{ ?>
                                                        <div class="body-row" style="border-bottom: solid 2px #43526E">
                                                    <?php } ?>
                                                        <div style="float: left; width: 5%;"><?=$indexI?></div>
                                                        <div style="float: left; width: 15%;"><?=$item->entry_date?></div>
                                                        <div style="float: left; width: 40%;">
                                                            <?php foreach($item->actors as $actor){?>
                                                                <div><?=$actor?></div>    
                                                            <?php } ?>
                                                        </div>
                                                        <div style="float: left; width: 40%;">
                                                            <?php foreach($item->defendants as $actor){?>
                                                                <div><?=$defendant?></div>    
                                                            <?php } ?>
                                                        </div>
                                                    </div>
                                                <?php } ?>
                                            </div>
                                        <?php } ?>
                                    </div>
                                </div>
                            <?php } ?>
                        </div>
                    <?php }else{ ?>
                        <div class="body-section">
                            <div class="body-row">
                                No se encontró resultados.
                            </div>
                        </div>
                    <?php } ?>
                </div>
            <?php }?>
            <?php if ($control_organism->field == 'expel' && $control_organism->section == 2 && $control_organism->status == 'finished') {?>
                <div class="block-body">
                    <div class="title-block"><?=$control_organism->name?></div>
                    <?php if (sizeof($register->expel_defendant) > 0){ ?>
                        <div>
                            <?php foreach ($register->expel_defendant as $process ){ ?>
                                <div>
                                    <div>
                                        <div class="head-row">
                                            <div style="float: left; width: 30%;">Fecha de ingreso</div>
                                            <div style="float: left; width: 30%;">No. Proceso</div>
                                            <div style="float: left; width: 40%;">Número de documento</div>
                                        </div>
                                        <div class="body-section">
                                            <div class="body-row">
                                                <div style="float: left; width: 30%;"><?=$process->entry_date?></div>
                                                <div style="float: left; width: 30%;"><?=$process->no_process?></div>
                                                <div style="float: left; width: 40%;"><?=$process->crime_issue?></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div style="margin-bottom: 20px;">
                                        <div style="margin-bottom: 10px; font-weight: bold;">Detalle del proceso</div>
                                        <div>
                                            <div style="font-size: 0.9em;">
                                                <table>
                                                    <tr>
                                                        <td>Materia:</td>
                                                        <td><?=$process->matter?></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Delito/Asunto:</td>
                                                        <td><?=$process->crime_issue?></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Tipo de acción:</td>
                                                        <td><?=$process->action_type?></td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="head-row">
                                            <div style="float: left; width: 5%;">No.</div>
                                            <div style="float: left; width: 15%;">Fecha</div>
                                            <div style="float: left; width: 40%;">Actores/ Ofendidos</div>
                                            <div style="float: left; width: 40%;">Demandados/ Procesados</div>
                                        </div>
                                        <?php foreach ($process->movements as $subject){ ?>
                                            <div class="body-section">
                                                <div class="body-row-header">
                                                    <div>
                                                        <strong>Dependencia jurisdiccional:</strong>
                                                        <span><?=$subject->jurisdiction?></span>
                                                    </div>
                                                    <div>
                                                        <strong>Ciudad:</strong>
                                                        <span><?=$subject->city?></span>
                                                    </div>
                                                </div>
                                                <?php foreach ($subject->incidents as $indexI => $item){ ?>
                                                    <?php if($item === end($subject->incidents)){ ?>
                                                        <div class="body-row">
                                                    <?php }else{ ?>
                                                        <div class="body-row" style="border-bottom: solid 2px #43526E">
                                                    <?php } ?>
                                                        <div style="float: left; width: 5%;"><?=$indexI?></div>
                                                        <div style="float: left; width: 15%;"><?=$item->entry_date?></div>
                                                        <div style="float: left; width: 40%;">
                                                            <?php foreach($item->actors as $actor){?>
                                                                <div><?=$actor?></div>    
                                                            <?php } ?>
                                                        </div>
                                                        <div style="float: left; width: 40%;">
                                                            <?php foreach($item->defendants as $actor){?>
                                                                <div><?=$defendant?></div>    
                                                            <?php } ?>
                                                        </div>
                                                    </div>
                                                <?php } ?>
                                            </div>
                                        <?php } ?>
                                    </div>
                                </div>
                            <?php } ?>
                        </div>
                    <?php }else{ ?>
                        <div class="body-section">
                            <div class="body-row">
                                No se encontró resultados.
                            </div>
                        </div>
                    <?php } ?>
                </div>
            <?php }?>
            <?php if ($control_organism->field == 'sri' && $control_organism->status == 'finished'){ ?>
                <div class="block-body">
                    <div class="title-block"><?=$control_organism->name?></div>
                    <div>
                        <div class="head-row">
                            <div style="float: left; width: 50%;">RUC / Cédula</div>
                            <div style="float: left; width: 50%;">Razón Social / Apellidos y nombres</div>
                        </div>
                        <div class="body-section">
                            <div class="body-row">
                                <div style="float: left; width: 50%;"><?=$register->sri[0]->cedula?></div>
                                <div style="float: left; width: 50%;"><?=$register->sri[0]->full_name?></div>
                            </div>
                        </div>
                    </div>
                    <?php foreach ($register->sri as $item) {?>
                        <?php if ($item->firm_debts && $item->disputed_debts && $item->payment_facilities){ ?>
                            <div>
                                <div class="head-row">
                                    <div style="float: left; width: 33%;">Deudas firmes</div>
                                    <div style="float: left; width: 34%;">Deudas impugnadas</div>
                                    <div style="float: left; width: 33%;">Facilidades de pago</div>
                                </div>
                                <div class="body-section">
                                    <div class="body-row">
                                        <div style="float: left; width: 33%;"><?=$item->firm_debts?></div>
                                        <div style="float: left; width: 34%;"><?=$item->disputed_debts?></div>
                                        <div style="float: left; width: 33%;"><?=$item->payment_facilities?></div>
                                    </div>
                                </div>
                            </div>
                        <?php }else{ ?>
                            <div class="body-section">
                                <div class="body-row">
                                    <?=$item->message?>
                                </div>
                            </div>
                        <?php } ?>
                    <?php } ?>
                </div>
            <?php } ?>
            <?php if ($control_organism->field == 'min_educacion' && $control_organism->status == 'finished'){ ?>
                <div class="block-body">
                    <div class="title-block"><?=$control_organism->name?></div>
                    <?php if ($number_items['num_ministry_education'] > 0){ ?>
                        <div>
                            <div class="head-row">
                                <div style="float: left; width: 4%;">No.</div>
                                <div style="float: left; width: 10%;">CI</div>
                                <div style="float: left; width: 20%;">Nombre de titulado</div>
                                <div style="float: left; width: 20%;">Institución Educativa</div>
                                <div style="float: left; width: 20%;">Título</div>
                                <div style="float: left; width: 17%;">Especialidad</div>
                                <div style="float: left; width: 8%;">F. Grado</div>
                            </div>
                            <div class="body-section">
                                <?php foreach ($register->min_educacion as $item){ ?>
                                    <?php if ($item === end($register->min_educacion)){ ?>
                                        <div class="body-row">
                                    <?php }else{ ?>
                                        <div class="body-row" style="border-bottom: solid 2px #43526E">
                                    <?php } ?>
                                        <div style="float: left; width: 4%;"><?=$item->no?></div>
                                        <div style="float: left; width: 10%;"><?=$item->id_number?></div>
                                        <div style="float: left; width: 20%;"><?=$item->full_name?></div>
                                        <div style="float: left; width: 20%;"><?=$item->college?></div>
                                        <div style="float: left; width: 20%;"><?=$item->degree?></div>
                                        <div style="float: left; width: 17%;"><?=$item->speciality?></div>
                                        <div style="float: left; width: 8%;"><?=$item->graduation_date?></div>
                                    </div>
                                <?php } ?>
                            </div>
                        </div>
                    <?php }else{ ?>
                        <div class="body-section">
                            <div class="body-row">
                                No se encontró resultados.
                            </div>
                        </div>
                    <?php }  ?>
                </div>
            <?php }  ?>
            <?php if ($control_organism->field == 'senescyt' && $control_organism->status == 'finished'){ ?>
                <div class="block-body">
                    <div class="title-block"><?=$control_organism->name?></div>
                    <?php foreach($register->senescyt as $item_register){?>
                        <?php if (sizeof($item_register->degress) == 0){ ?>
                            <div class="body-section">
                                <div class="body-row">
                                    No se encontró resultados.
                                </div>
                            </div>
                        <?php }else{ ?>
                            <div>
                                <div class="head-row">
                                    <div style="float: left; width: 25%;">Título</div>
                                    <div style="float: left; width: 25%;">Institución</div>
                                    <div style="float: left; width: 10%;">Tipo</div>
                                    <div style="float: left; width: 15%;">Reconocido por</div>
                                    <div style="float: left; width: 14%;">No. Registro</div>
                                    <div style="float: left; width: 10%;">F. Registro</div>
                                </div>
                                <div class="body-section">
                                    <?php foreach ($item_register->degress as $item){ ?>
                                        <?php if ($item === end($item_register->degress)){ ?>
                                            <div class="body-row">
                                        <?php }else{  ?>
                                            <div class="body-row" style="border-bottom: solid 2px #43526E">
                                        <?php }  ?>
                                            <div style="float: left; width: 25%;"><?=$item->title?></div>
                                            <div style="float: left; width: 25%;"><?=$item->college?></div>
                                            <div style="float: left; width: 10%;"><?=$item->type?></div>
                                            <div style="float: left; width: 15%;"><?=$item->recognized ? $item->recognized: ' - '?></div>
                                            <div style="float: left; width: 14%;"><?=$item->register_num?></div>
                                            <div style="float: left; width: 10%;"><?=$item->register_date?></div>
                                        </div>
                                    <?php } ?>
                                </div>
                            </div>
                        <?php }  ?>
                    <?php }  ?>
                </div>
            <?php }  ?>
            <?php if ($control_organism->field == 'ant' && $control_organism->status == 'finished'){ ?>
                <div class="block-body">
                    <div class="title-block"><?=$control_organism->name?></div>
                    <div>
                        <div class="head-row">
                            <div style="float: left; width: 50%;">Cédula</div>
                            <div style="float: left; width: 50%;">Nombres</div>
                        </div>
                        <div class="body-section">
                            <div class="body-row">
                                <div style="float: left; width: 50%;"><?=$register->ant[0]->cedula?></div>
                                <div style="float: left; width: 5   0%;"><?=$register->ant[0]->full_name?></div>
                            </div>
                        </div>
                    </div>
                    <?php if ($number_items['num_ant'] > 0){ ?>
                        <div>
                            <div class="subtitle-text" fxHide fxShow.gt-sm>Licencias</div>
                            <div>
                                <div class="head-row">
                                    <div style="float: left; width: 20%;">Tipo</div>
                                    <div style="float: left; width: 20%;">Fecha emisión</div>
                                    <div style="float: left; width: 20%;">Fecha expiración</div>
                                    <div style="float: left; width: 20%;">Puntos</div>
                                    <div style="float: left; width: 20%;">Total</div>
                                </div>
                                <div class="body-section">
                                    <?php foreach ($register->ant as $item){ ?>
                                        <?php if ($item === end($register->ant)){ ?>
                                            <div class="body-row">
                                        <?php }else{  ?>
                                            <div class="body-row" style="border-bottom: solid 2px #43526E">
                                        <?php }  ?>
                                            <div style="float: left; width: 20%;"><?=$item->license_type?></div>
                                            <div style="float: left; width: 20%;"><?=$item->expedition_date?></div>
                                            <div style="float: left; width: 20%;"><?=$item->expiration_date?></div>
                                            <div style="float: left; width: 20%;"><?=$item->points?></div>
                                            <div style="float: left; width: 20%;"><?=$item->total?></div>
                                        </div>
                                    <?php } ?>
                                </div>
                            </div>
                        </div>
                    <?php }  ?>
                </div>
            <?php }  ?>
            <?php if ($control_organism->field === 'fis_gen_estado' && $control_organism->status == 'finished'){?>
                <div class="block-body">
                    <div class="title-block"><?=$control_organism->name?></div>
                    <?php foreach($register->fis_gen_estado as $item){?>
                        <div style="margin-bottom: 20px;">
                            <div>
                                <div class="head-row">
                                    <div style="float: left; width: 15%;">Noticia del delito</div>
                                    <div style="float: left; width: 15%;">Lugar y fecha</div>
                                    <div style="float: left; width: 35%;">Delito</div>
                                    <div style="float: left; width: 35%;">Especialidad</div>
                                </div>
                                <div class="body-section">
                                    <div class="body-row">
                                        <div style="float: left; width: 15%;"><?=$item->no_process?></div>
                                        <div style="float: left; width: 15%;"><?=$item->place_date?></div>
                                        <div style="float: left; width: 35%;"><?=$item->crime?></div>
                                        <div style="float: left; width: 35%;"><?=$item->unit?></div>
                                    </div>
                                </div>
                            </div>
                            <div class="body-section" style="margin-bottom: 15px;">
                                <div class="subject-row">Sujetos</div>
                            </div>
                            <div class="body-section">
                                <div class="body-row">
                                    <div style="float: left; width: 33%;">
                                        <div style="font-weight: bold;">Cédula</div>
                                        <div><?=$item->person->id_number?></div>
                                    </div>
                                    <div style="float: left; width: 33%;">
                                        <div style="font-weight: bold;">Nombres completos</div>
                                        <div><?=$item->person->full_name?></div>
                                    </div>
                                    <div style="float: left; width: 33%;">
                                        <div style="font-weight: bold;">Estado</div>
                                        <div><?=$item->person->status?></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <?php }  ?>
                </div>
            <?php }  ?>
        <?php } ?>
    </div>
</body>