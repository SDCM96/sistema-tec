import { Component, OnInit } from '@angular/core';
import { Mantenimiento } from '../../models/mantenimiento';
import { MantenimientoService } from "../../services/mantenimiento.service";

@Component({
  selector: 'app-crear-mantenimiento',
  templateUrl: './crear-mantenimiento.component.html',
  styleUrls: ['./crear-mantenimiento.component.scss'],
  providers: [MantenimientoService]
})
export class CrearMantenimientoComponent implements OnInit {
	public mantenimiento: Mantenimiento;

  constructor(
  	private _mantenimientoService: MantenimientoService,
  	) 
  {
  	this.mantenimiento = new Mantenimiento(1, 1 , 1 ,'','','','','','',''); 
  }

  ngOnInit(): void {
  }

}
