import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VotacionService } from '../../../shared/services/votacion/votacion.service';
import { APIENDPOINT } from '../../../config/configuration';

@Component({
    selector: 'app-resultado',
    templateUrl: './resultado.component.html',
    styleUrls: ['./resultado.component.css']
})
export class ResultadoComponent implements OnInit {

    id: number | undefined;
    reporteria: any[] = [];

    asambleaId: number | undefined;
    preguntaId: number | undefined;
    currentRole: number = 0;

    title = 'Resultados';

    private readonly baseColors: string[] = [
        "#42A5F5",
        "#66BB6A",
        "#FFA726",
        "#FF7043",
        "#AB47BC"
    ];

    chartOptions = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        }
    };

    constructor(
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        private readonly votacionService: VotacionService
    ) { }

    ngOnInit() {
        // Capturamos el id_pregunta desde la URL
        this.route.params.subscribe(params => {
            this.asambleaId = +params['asambleaId']; // Captura asambleaId
            this.preguntaId = +params['preguntaId']; // Captura preguntaId si está presente        
        });
        if (this.asambleaId) {
            this.refreshResultados(); // Llamamos a la función para refrescar los resultados
        }

        // Capturamos el id_asamblea desde localStorage
        const currentAsambleaId = JSON.parse(localStorage.getItem('asambleaId') ?? '{}');
        this.asambleaId = currentAsambleaId.id_asamblea || 0; // id de la asamblea

        // Obtener rol
        const currentRol = JSON.parse(localStorage.getItem('currentUser') || '{}');
        this.currentRole = currentRol.id_rol || 0;
    }

    refreshResultados() {
        if (this.asambleaId) {
            this.votacionService.getReporteriaById(APIENDPOINT.reporteria, this.asambleaId, this.preguntaId).subscribe((data) => {
                this.processChartData(data);
            });
        }
    }

    processChartData(data: any) {
        if (Array.isArray(data.respuesta)) {
            const groupedData = this.groupBy(data.respuesta, 'id_pregunta');
            this.reporteria = Object.keys(groupedData).map(key => {
                const preguntaData = groupedData[key];
                return {
                    pregunta: preguntaData[0].descripcion,
                    data: {
                        labels: preguntaData.map((item: { opcion: any; }) => item.opcion),
                        datasets: [{
                            data: preguntaData.map((item: { total_votos: any; }) => item.total_votos),
                            backgroundColor: this.assignColors(preguntaData.length)
                        }]
                    }
                };
            });
        } else {
            this.reporteria = [];
        }
    }

    groupBy(array: any[], key: string) {
        return array.reduce((result, currentValue) => {
            (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
            return result;
        }, {});
    }

    assignColors(length: number): string[] {
        const colors: string[] = [];
        let colorIndex = 0;

        for (let i = 0; i < length; i++) {
            colors.push(this.baseColors[colorIndex]);
            colorIndex = (colorIndex + 1) % this.baseColors.length;
        }
        return colors;
    }

    volver(role: number): void {
        switch (role) {
            case 1:
                this.router.navigate(['/home/preguntas', this.asambleaId]);  // Usuario
                break;
            case 2:
                this.router.navigate(['asambleas/editar-preguntas', this.asambleaId]); // Admin
                break;
            case 3:
                this.router.navigate(['asambleas/editar-preguntas', this.asambleaId]); // SuperAdmin
                break;
            default:
                this.router.navigate(['/']);
                break;
        }
    }
}