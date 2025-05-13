import { Injectable } from '@angular/core';

@Injectable()
export class HelperService {

  generateDate(stringDate, withHour){
    let date = new Date();
    if(stringDate != ''){
      date = new Date(stringDate);
    }
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let dateStr = year+'-'+this.addCero(month)+'-'+this.addCero(day);
    if(withHour){
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
      dateStr += ' '+this.addCero(hours)+':'+this.addCero(minutes)+':'+this.addCero(seconds);
    }
    return dateStr;
  }

  addCero(value){
    if(value < 10){
      value = '0'+value;
    }
    return value;
  }

  getIdFirebase(evaluation){
    let idFirebase = 'S'+evaluation.id;
    let dateChange = new Date('2023-08-11 00:00:00');
    let dateConsent = new Date(evaluation.fecha_consentimiento);
    if(!evaluation.fecha_consentimiento){
      dateConsent = new Date(evaluation.fecha_fin);
    }
    if(dateConsent <= dateChange){
      idFirebase = evaluation.ci;
    }
    return idFirebase;
  }

  isObject(obj) {	
    return typeof obj === 'object' && obj !== null && ! Array.isArray(obj)
  };

  isJson(value){
    let result = false;
    try {
      JSON.parse(value);
      result = true;
    }
    catch (error) {
      result = false
    }
    return result;
  }

  getDataMockup(){
    let data = {
      document: "1721194593",
      name: "Jonathan Toledo",
      criminal_record: {
        name: "TOLEDO CEVALLOS JONATHAN ALEXANDER",
        document_type: "CEDULA DE IDENTIDAD",
        document_number: "1721194593",
        has_background: "NO"
      },
      exit_impediment: {
        names: "TOLEDO CEVALLOS JONATHAN ALEXANDER",
        nationality: "ECUATORIANA",
        has_impediment: "NO"
      },
      supa: {
        card_code: "1701-7662",
        judicial_process_number: "1771",
        jurisdictional_dependency: "NO",
        pension_type: "Pensión alimenticia",
        participants: [
          {
            legal_representative: "ROJAS CALUPIÑA ELIZABETH DEL ROCIO",
            principal_obligor: "CEVALLOS RODRIGUEZ PEDRO LUIS"
          },
        ],
      },
      judicial_processes:{
        demanding: [{
          date_admission: '2022-10-07 18:28:09',
          process_number: '06282202204582G',
          document_number: 'ARCHIVO DE LA INVESTIGACIÓN PREVIA ART. 586',
          detail: {
            subject: 'PENAL COIP',
            crime_matter: 'ARCHIVO DE LA INVESTIGACIÓN PREVIA ART. 586',
            type_action: 'INVESTIGACIÓN PREVIA'
          },
          subjects: [
            {
              dependency: 'Unidad Judicial Multicompetente Penal Con Sede En El Cantón Pasaje',
              city: 'Pasaje',
              data: [
                {
                  date: '28/09/2017 10:09',
                  offended: 'Sanchez Gutierrez Diana Sofia, Aviles Avila Ana Amalia',
                  defendants: 'Cevallos Alvarado Hector Arturo',
                  judicial_proceedings: [
                    {
                      date: '20/08/2020 16:11',
                      title: 'OFICIO (OFICIO)',
                      detail: ''
                    },
                    {
                      date: '04/08/2020 09:58',
                      title: 'OFICIO A ENTIDADES PUBLICAS (OFICIO)',
                      detail: ''
                    },
                    {
                      date: '31/07/2020 11:45',
                      title: 'PROVIDENCIAL GENERAL (OFICIO)',
                      detail: ''
                    },
                    {
                      date: '04/08/2020 09:58',
                      title: 'OFICIO A ENTIDADES PUBLICAS (OFICIO)',
                      detail: 'Pasaje, viernes 31 de julio del 2020, las 11h45, VISTOS.- Abg. Diana Cecibel Quezada Moreno, Jueza de la Unidad Judicial Multicompetente Penal del cantón Pasaje, mediante Acción de Personal Nº 10854-DNTH-2015-SBS de fecha 26 de agosto de 2015.- Dentro de la Causa N° 07258-2017-00119 que se sigue por un presunto delito de TENTATIVA DE FEMICIDIO en contra de CEVALLOS ALVARADO HECTOR ARTURO, dispongo lo siguiente: 1.- Incorpórese a autos la documentación remitida por el Centro de Rehabilitación Social de la ciudad de Machala respecto del ingreso del procesado CEVALLOS ALVARADO HECTOR ARTURO a dicho Centro;'
                    },
                    {
                      date: '31/07/2020 11:45',
                      title: 'PROVIDENCIAL GENERAL (OFICIO)',
                      detail: ''
                    },
                  ]
                }
              ]
            },
            {
              dependency: 'Tribunal De Garantías Penales Con Sede En El Cantón Machala Provincia De El Oro',
              city: 'Machala',
              data: [
                {
                  date: '28/09/2017 10:09',
                  offended: 'Sanchez Gutierrez Diana Sofia, Aviles Avila Ana Amalia',
                  defendants: 'Cevallos Alvarado Hector Arturo',
                  judicial_proceedings: [
                    {
                      date: '20/08/2020 16:11',
                      title: 'OFICIO (OFICIO)',
                      detail: ''
                    },
                  ]
                },
                {
                  date: '28/09/2017 10:09',
                  offended: 'Sanchez Gutierrez Diana Sofia, Aviles Avila Ana Amalia',
                  defendants: 'Cevallos Alvarado Hector Arturo',
                  judicial_proceedings: [
                    {
                      date: '20/08/2020 16:11',
                      title: 'OFICIO (OFICIO)',
                      detail: ''
                    },
                  ]
                },
                {
                  date: '28/09/2017 10:09',
                  offended: 'Sanchez Gutierrez Diana Sofia, Aviles Avila Ana Amalia',
                  defendants: 'Cevallos Alvarado Hector Arturo',
                  judicial_proceedings: [
                    {
                      date: '20/08/2020 16:11',
                      title: 'OFICIO (OFICIO)',
                      detail: ''
                    },
                  ]
                }
              ]
            }
          ]
        }],
        defendant: []
      },
      sri_obligations: {
        ruc_cedula: "0991327371001",
        cutoff_date: "01-SEP-2023",
        company_name: "TELCONET S.A.",
        firm_debts: "0.0",
        disputed_debts: "32173257.30",
        payment_facilities: "0.0",
      },
      national_transit_agency: {
        name: "TOLEDO CEVALLOS JONATHAN ALEXANDER",
        document_number: "1721194593",
        licenses: [
          {type:"B", broadcast_date: "08-03-2022",expiration_date: "07-03-2027"},
          {type:"A", broadcast_date: "25-08-2020",expiration_date: "24-08-2025"},
        ],
        points: "30",
        total: "0.00"
      },
      ministry_education: [
        {
          identification: "1721194593",
          name_graduate: "TOLEDO CEVALLOS JONATHAN ALEXANDER",
          educational_institution: "MILITAR ABDON CALDERON",
          college_degree: "TECNICO EN COMERCIO EXTERIOR",
          specialty: "COMERCIO EXTERIOR",
          grade_date: "2010-07-23"
        }
      ],
      senescyt: {
        fourth_level: [
          {
            college_degree: "MAGISTER EN DOCENCIA UNIVERSITARIA Y ADMINISTRACION EDUCATIVA",
            higher_education_institution: "UNIVERSIDAD TECNOLOGICA INDOAMERICA",
            type: "Nacional",
            recognized_by: "",
            registry_number: "1045-11-735632",
            registration_date: "2011-09-20",
          }
        ],
        third_level: [
          {
            college_degree: "MAGISTER EN DOCENCIA UNIVERSITARIA Y ADMINISTRACION EDUCATIVA",
            higher_education_institution: "UNIVERSIDAD TECNOLOGICA INDOAMERICA",
            type: "Nacional",
            recognized_by: "",
            registry_number: "1045-11-735632",
            registration_date: "2011-09-20",
          }
        ],
        third_technical_level: []
      }
    }
    return data;
  }
}