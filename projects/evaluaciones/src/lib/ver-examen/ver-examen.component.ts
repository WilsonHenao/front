import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'lib-ver-examen',
  templateUrl: './ver-examen.component.html',
  styleUrls: ['./ver-examen.component.css']
})
export class VerExamenComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<VerExamenComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    dialogRef.disableClose = true;
   }

  ngOnInit(): void {
    console.log(this.data.exams.exam);
  }

}
