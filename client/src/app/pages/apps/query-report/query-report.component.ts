import { Component, OnInit } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import { QueryService } from 'src/app/services/query.service';
import { HelperService } from 'src/app/guards/helper.service';

@Component({
  selector: 'fury-query-report',
  templateUrl: './query-report.component.html',
  styleUrls: ['./query-report.component.scss']
})

export class QueryReportComponent implements OnInit {

  register: any;
  userLogger: any;
  filters = [
    {id: 1, name: 'Bases de datos ecuatorianas'},
    {id: 2, name: 'Bases de datos internacionales'},
  ]

  controlOrganisms = [
    {organims: 'MINISTERIO DEL INTERIOR', consultation: 'Antecedentes penales', field: 'criminal_record', note: '', message: 'Limpio', action: 'Ver'},
    {organims: 'POLICIA NACIONAL', consultation: 'Impedimento de Salida del País', field: 'exit_impediment', note: '', message: 'Limpio', action: 'Ver'},
    {organims: 'CONSEJO DE LA JUDICATURA', consultation: 'Sistema Único de Pensiones Alimenticias', field: 'supa', note: '', message: 'Alerta', action: 'Ver'},
    {organims: 'CONSEJO DE LA JUDICATURA', consultation: 'Procesos judiciales', field: 'judicial_processes.demanding', note: '', message: 'Alerta', action: 'Ver'},
    {organims: 'CONSEJO DE LA JUDICATURA', consultation: 'Procesos judiciales', field: 'judicial_processes.defendant', note: '', message: 'Limpio', action: 'Ver'},
    {organims: 'SERVICIO DE RENTAS INTERNAS', consultation: 'Deudas firmes e impugnadas', field: 'sri_obligations', note: '', message: 'Alerta', action: 'Ver'},
    {organims: 'MINISTERIO DE EDUCACION', consultation: 'Título de bachiller', field: 'ministry_education', note: '', message: 'Limpio', action: 'Ver'},
    {organims: 'SENESCYT', consultation: 'Título de educación superior', field: 'senescyt', note: '', message: 'Alerta', action: 'Ver'},
    {organims: 'AGENCIA NACIONAL DE TRANSITO', consultation: 'Consulta de citaciones', field: 'national_transit_agency', note: '', message: 'Alerta', action: 'Ver'},
  ];

  typesAlertsMessage = [
    {type: 'Alerta', color: '#ff0000', backgroud: '#ff00001f'}, 
    {type: 'Limpio', color: '#00ff00', backgroud: '#00ff001f'}
  ]

  headerTableControlOrganisms = [
    {title: 'Organismo de control', field: 'organims', type: 'text', width: '25%'},
    {title: 'Consulta realizada', field: 'consultation', type: 'text', width: '25%'},
    {title: 'Nota', field: 'note', type: 'text_action', icon: 'assets/img/icons/actualizar.svg', width: '25%'},
    {title: 'Mensaje', field: 'message', type: 'alert', types_alerts: this.typesAlertsMessage, width: '25%'},
  ]

  headerTableCriminalRecords = [
    {title: 'Nombre', field: 'name', type: 'text', width: '25%'},
    {title: 'Tipo de documento', field: 'document_type', type: 'text', width: '25%'},
    {title: 'Número de documento', field: 'document_number', type: 'text', width: '25%'},
    {title: 'Posee antecedentes', field: 'has_background', type: 'text', width: '25%'},
  ]

  headerTableExitImpediment = [
    {title: 'Apellidos y nombres', field: 'names', type: 'text', width: '34%'},
    {title: 'Nacionalidad', field: 'nationality', type: 'text', width: '33%'},
    {title: 'Tiene impedimento', field: 'has_impediment', type: 'text', width: '33%'},
  ]

  headerParticipants = [
    {title: 'Obligado principal', field: 'legal_representative'},
    {title: 'Representante legal', field: 'principal_obligor'}
  ]

  headerTableSUPA = [
    {title: 'Código de tarjeta', field: 'card_code', type: 'text', width: '10%'},
    {title: 'No. Proceso Judicial', field: 'judicial_process_number', type: 'text', width: '10%'},
    {title: 'Dependencia Jurisdiccional', field: 'jurisdictional_dependency', type: 'text', width: '25%'},
    {title: 'Tipo de pensión', field: 'pension_type', type: 'text', width: '15%'},
    {title: 'Intervinientes', field: 'participants', type: 'array', headerArray: this.headerParticipants, width: '40%'},
  ]

  headerTableSri = [
    {title: 'RUC / Cédula', field: 'ruc_cedula', type: 'text', width: '33%'},
    {title: 'Razón Social / Apellidos y nombres', field: 'company_name', type: 'text', width: '34%'},
    {title: 'Fecha de corte', field: 'cutoff_date', type: 'text', width: '33%'},
  ]

  headerTableSriPendingObligations = [
    {title: 'Deudas firmes', field: 'firm_debts', type: 'text', width: '33%'},
    {title: 'Deudas impugnadas', field: 'disputed_debts', type: 'text', width: '34%'},
    {title: 'Facilidades de pago', field: 'payment_facilities', type: 'text', width: '33%'},
  ]

  headerTableMinistryEducation = [
    {title: 'No.', field: '', type: 'auto_increment', width: '4%'},
    {title: 'No. de identifi', field: 'identification', type: 'text', width: '10%'},
    {title: 'Nombre de titulado', field: 'name_graduate', type: 'text', width: '20%'},
    {title: 'Institución Educativa', field: 'educational_institution', type: 'text', width: '20%'},
    {title: 'Título', field: 'college_degree', type: 'text', width: '20%'},
    {title: 'Especialidad', field: 'specialty', type: 'text', width: '18%'},
    {title: 'Fecha Grado', field: 'grade_date', type: 'text', width: '8%'},
  ]

  headerTableSenescyt = [
    {title: 'Título', field: 'college_degree', type: 'text', width: '25%'},
    {title: 'Institución de Educación Superior', field: 'higher_education_institution', type: 'text', width: '25%'},
    {title: 'Tipo', field: 'type', type: 'text', width: '10%'},
    {title: 'Reconocido por', field: 'recognized_by', type: 'text', width: '15%'},
    {title: 'No. Registro', field: 'registry_number', type: 'text', width: '15%'},
    {title: 'Fecha de registro', field: 'registration_date', type: 'text', width: '10%'},
  ]

  headerTableANT = [
    {title: 'Cédula', field: 'document_number', type: 'text', width: '20%'},
    {title: 'Nombres', field: 'name', type: 'text', width: '30%'},
    {title: 'Puntos', field: 'points', type: 'text', width: '25%'},
    {title: 'Total', field: 'total', type: 'text', width: '25%'},
  ]

  headerTableANTLicenses = [
    {title: 'Tipo', field: 'type', type: 'text', width: '33%'},
    {title: 'Fecha emisión', field: 'broadcast_date', type: 'text', width: '34%'},
    {title: 'Fecha expiración', field: 'expiration_date', type: 'text', width: '33%'},
  ]

  headerTableJudicialProcesses = [
    {title: 'Fecha de ingreso', field: 'date_admission', type: 'text', width: '33%'},
    {title: 'No. Proceso', field: 'process_number', type: 'text', width: '33%'},
    {title: 'Número de documento', field: 'document_number', type: 'text', width: '34%'},
  ]

  headerJudicialProcesses = [
    {title: 'No.', field: 'date_admission', type: 'text', width: '5%'},
    {title: 'Fecha', field: 'date', type: 'text', width: '15%'},
    {title: 'Actores/ Ofendidos', field: 'offended', type: 'text', width: '40%'},
    {title: 'Demandados/ Procesados', field: 'defendants', type: 'text', width: '40%'},
  ]
  
  constructor(
    private dialog: MatDialog,
    private helperService: HelperService,
    private queryService: QueryService,
  ) {}

  ngOnInit() {
    this.register = this.queryService.getDataResult();
    // this.register = this.helperService.getDataMockup();
    console.log(this.register);
    this.downloadPDF()
  }

  downloadPDF() {
    // Extraemos el
    const DATA = document.getElementById('htmlData');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_tutorial.pdf`);
    });
  }

  validDebts(){
    let firm_debts = parseFloat(this.register.sri_obligations.firm_debts)
    let disputed_debts = parseFloat(this.register.sri_obligations.disputed_debts)
    let payment_facilities = parseFloat(this.register.sri_obligations.payment_facilities)

    let result = true
    if(firm_debts <= 0 && disputed_debts <= 0 && payment_facilities <= 0){
      result = false
    }
    return result
  }

  validSenescyt(){
    let countFourthLevel = this.register.senescyt.fourth_level.length
    let countThirdLevel = this.register.senescyt.third_level.length
    let countThirdTechnicalLevel = this.register.senescyt.third_technical_level.length

    let result = true
    if(countFourthLevel <= 0 && countThirdLevel <= 0 && countThirdTechnicalLevel <= 0){
      result = false
    }
    return result
  }
}
