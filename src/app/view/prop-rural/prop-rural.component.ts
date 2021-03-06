import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, catchError, toArray } from 'rxjs/operators';
import { AuthenticationService } from '../../authentication.service';

class ButtonOption {
	constructor(
		public text: string,
		public link: string,
		public color: string) { }
}

@Component({
	selector: 'app-prop-rural',
	templateUrl: './prop-rural.component.html',
	styleUrls: ['./prop-rural.component.css']
})
export class PropRuralComponent implements OnInit {

	public PropId: string;
	public Prop: any;
	options = [];

	public valueX: Number;

	private subscription: any;

	constructor(private activeRoute: ActivatedRoute, private http: HttpClient, private router: Router, private auth: AuthenticationService) {

		this.subscription = this.activeRoute.paramMap.subscribe(params => {
			if (params.get('propid')) {

				this.PropId = params.get('propid');

				// this.options.push(new ButtonOption('Sensores', '/sensors', 'primary'));
				this.options.push(new ButtonOption('Talhões', '/talhao' + '/' + this.PropId, 'primary'));
				// this.options.push(new ButtonOption('EarthEngine', '#', 'primary'));
				// this.options.push(new ButtonOption('Drone', '#', 'primary'));
				// this.options.push(new ButtonOption('Sala De Controle (Cockpit)', 'cockpit', 'primary'));
			}
		});

		setInterval(() => {
			this.valueX = Math.round(Math.random() * 10000) / 100;
		}, 1000);
	}

	ngOnInit() {
		const httpOptions = {
			headers: new HttpHeaders({
				'Authorization': this.auth.getToken(),
				'userid': this.auth.getUserId()
			}),
		};


		this.http.get('/api/propriedade/' + this.PropId, httpOptions).subscribe(data => {
			console.log('data');
			console.log(data);

			this.Prop = data;
		}, err => {
			if (err.status === 401) {
				this.router.navigate(['login']);
			}
		});
	}

}

/*
options = [
	// new ButtonOption('Talhão', '', 'primary'),
	// new ButtonOption('Pontos de Coleta', '', 'primary'),
	// new ButtonOption('Solo Análises', '', 'primary'),
	// new ButtonOption('Safra Platio', '', 'primary'),
	// new ButtonOption('Safra Estádios', '', 'primary'),
	// new ButtonOption('Histórico Produtividade', '', 'primary'),
	// new ButtonOption('Estações Agrometeorológicas', '', 'primary'),
	// new ButtonOption('Link SDUM Zonas de Manejo', '', 'primary'),
	// new ButtonOption('Link EarthEngine ', '', 'primary'),
	// new ButtonOption('Link Drone', '', 'primary'),
	// new ButtonOption('Clima', '', 'primary'),
	// new ButtonOption('Evatranspiração', '', 'primary'),
	// new ButtonOption('Balanço Hidríco/Estress Hídrico', '', 'primary'),
	// new ButtonOption('Fotoperíodo Acumulado', '', 'primary'),
	// new ButtonOption('Graus Dias Acumulado (GDD)', '', 'primary'),
	// new ButtonOption('Estimativa Estádios ', '', 'primary'),
	// new ButtonOption('Manejo Integrado Pragas e Doenças', '', 'primary'),
	// new ButtonOption('Dados Pulverização', '', 'primary'),
	// new ButtonOption('Potencial Produtivo Safra', '', 'primary'),
	new ButtonOption('Sensores', '['proprural', this.PropId, 'sensors']', 'primary'),
	new ButtonOption('EarthEngine', '#', 'primary'),
	new ButtonOption('Drone', '#', 'primary'),
	new ButtonOption('Sala De Controle (Cockpit)', '['proprural', this.PropId, 'cockpit']', 'primary')
]
*/
