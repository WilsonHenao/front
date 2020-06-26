import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { MatDialog } from '@angular/material/dialog';
import { RealizarExamenComponent } from '../realizar-examen/realizar-examen.component';

@Component({
  selector: 'lib-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.css']
})

export class EstudianteComponent implements OnInit {
  displayedColumns = ['examDescription', 'button'];
  examen: any;
  idExamen: any;
  question: any;
  idQuestion: any;
  option: any;
  idOptions: any;

  constructor(private service: ServiceService, public dialog: MatDialog) { }

  realizarExamen(i) {
    const dialogRef = this.dialog.open(RealizarExamenComponent, {
      disableClose: true,
      height: '600px',
      width: '600px',
      data: { exam: this.examen[i] },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result: ${result}');
    });
  }

  ngOnInit(): void {
    this.getExam();
  }

  getExam() {
    this.service.getAllExam().subscribe(success => {
      this.examen = success;
    }, error => {
      console.log(error);
    });
  }
}

