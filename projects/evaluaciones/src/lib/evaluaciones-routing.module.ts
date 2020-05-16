import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExamenComponent } from './examen/examen.component';
import { ProfesorComponent } from './profesor/profesor.component';
import { TipoUnoComponent } from './tipo-uno/tipo-uno.component';
import { ExamenFormularioComponent } from './examen-formulario/examen-formulario.component';
import { PreguntaFormularioComponent } from './pregunta-formulario/pregunta-formulario.component';
import { TipoDosComponent } from './tipo-dos/tipo-dos.component';

const routes: Routes = [
  {
    path:
      'examen', component: ExamenComponent
  },
  {
    path: '', component: ProfesorComponent
  },
  {
    path: 'examen/preguntaFormulario/tipoUno', component: TipoUnoComponent
  },
  {
    path: 'examen/examenFormulario', component: ExamenFormularioComponent
  },
  {
    path: 'examen/preguntaFormulario', component: PreguntaFormularioComponent
  },
  {
    path: 'examen/preguntaFormulario/tipoDos', component: TipoDosComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvaluacionesRoutingModule { }

