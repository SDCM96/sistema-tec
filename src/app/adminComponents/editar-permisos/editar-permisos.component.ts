import { Component, OnInit } from '@angular/core';
import {PermisoService} from "../../services/permiso.service"
import {variableService} from "../../services/variables.service"
import {UserService} from "../../services/user.service"
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import {ToastrService} from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-editar-permisos',
  templateUrl: './editar-permisos.component.html',
  styleUrls: ['./editar-permisos.component.scss'],
  providers: [PermisoService, variableService, UserService]
})
export class EditarPermisosComponent implements OnInit {

  token: any;
  textoCrear: string;
  departamentos: any;
  id: number;
  users: any;
  form: FormGroup;
  cargos: any;
  permiso;
  permisos;

  constructor(    
    private _formBuilder: FormBuilder,
    private _spinner: NgxSpinnerService,
    private _toastr: ToastrService,
    private _permisoService: PermisoService,
    private _variableService: variableService,
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute,
    ) 
    { 
      this.token = this._variableService.getToken();
      this.textoCrear = "actualiza el permiso";
      this.cargos = JSON.parse(localStorage.getItem('cargos'));
      this.departamentos = JSON.parse(localStorage.getItem('departamentos'));
      this.users = JSON.parse(localStorage.getItem('users'));
      this.permisos = JSON.parse(localStorage.getItem('permisos'));
    }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.getPermiso();
    this.editarForm();
  }

  
  private editarForm() {

		this.form = this._formBuilder.group({
      usuario_id: new FormControl(this.permiso.usuario_id, { validators: [Validators.required], updateOn: 'change' }),
      departamento_id: new FormControl(this.permiso.departamento_id, { validators: [Validators.required], updateOn: 'change' }),
      cargo_id: new FormControl(this.permiso.cargo_id, { validators: [Validators.required], updateOn: 'change' }),
    });
  

  } 

  getPermiso(){

    this._route.params.subscribe(params => {

      this.id = +params['id'];

        this.permiso = this.permisos.find(element => element.id == this.id);
      });
  }

  onSubmit(form){
    this._spinner.show();
    this._permisoService.updatePermiso(this.token, form, this.permiso.id).subscribe(
      response => {
        if(response.status == 'success'){
          this._toastr.success('el permiso se ha actualizado correctamente', 'LISTO');
          window.scrollTo(0,0);
          this._spinner.hide();

          //redireccion a inicio
          this._router.navigate(['permisos']);


        }else{
          this._spinner.hide();
          this._toastr.error('parece que algo anda mal, intentalo nuevamente', 'UPS');

        }
      },
      error =>{
        this._spinner.hide();
        console.log(<any>error);
        this._toastr.error('parece que los datos ingresados no son correctos', 'UPS');

      }
    )

  }

}



 

 











