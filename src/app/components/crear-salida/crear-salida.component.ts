import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, FormBuilder } from "@angular/forms";
import { SalidaService } from "../../services/salida.service";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-crear-salida',
  templateUrl: './crear-salida.component.html',
  styleUrls: ['./crear-salida.component.scss'],
  providers: [SalidaService]
})
export class CrearSalidaComponent implements OnInit {
  public salidaForm: FormGroup;
  public identity;
  public token;
  public vehiculos;
  public departamentos;
  public status;
  public loading;
  public textoCrear;
  public form: FormGroup;
  salida: any;


  constructor(
        private _salidaService: SalidaService,
        private _formBuilder: FormBuilder, 
        private _toastr: ToastrService,
        
  	) 
  {
  	this.identity = JSON.parse(localStorage.getItem('identity'));
    this.token = localStorage.getItem('token');
    this.textoCrear = "Crear una solicitud de salida";
    this.loading = false;
  }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.vehiculos = JSON.parse(localStorage.getItem('vehiculos'));
    this.departamentos = JSON.parse(localStorage.getItem('departamentos'));
    this.buildForm();

  }

  private buildForm() {

		this.form = this._formBuilder.group({
      usuario_id: new FormControl(this.identity.id),
      vehiculo_id: new FormControl('', { validators: [Validators.required], updateOn: 'change' }),
      depto_solicitante: new FormControl('', { validators: [Validators.required], updateOn: 'change' }),
      chofer: new FormControl(''),
      destino: new FormControl(''),
      descripcion: new FormControl(''),
      fecha: new FormControl('', { validators: [Validators.required], updateOn: 'change' }),
      hora_salida: new FormControl('', { validators: [Validators.required], updateOn: 'change' }),
      hora_llegada: new FormControl('', { validators: [Validators.required], updateOn: 'change' })
		});

  }

  onSubmit(value){
    this.loading = true;
    this._salidaService.createSalida(this.token, value).subscribe(
      response => {
      console.log("el servicio se ha ejecutado");
      if(response && response.status == 'success'){
        this.loading = false;
        this.status = 'success';
        let crudo = response.elemento_creado;
        this.salida = JSON.parse(localStorage.getItem('salidas'));
        this.salida.push(crudo);
        localStorage.setItem('salidas', JSON.stringify(this.salida));
        this._toastr.success('la solicitud se ha creado exitosamente', 'SOLICITUD EXITOSA');
        
      }else{ 
        this.loading = false;
        this.status = 'error';
       
      }
        

      },
      error=>{
        this.loading = false;
        
        this.status = 'error';
        this._toastr.error('algunos datos de la solicitud fueron erroneos', 'SOLICITUD FALLIDA');
        console.log(<any>error);
      }
      );
  }
 


}
