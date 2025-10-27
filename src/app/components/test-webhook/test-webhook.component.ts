import { Component, inject, OnInit, signal } from '@angular/core';
import { UtilitairesService } from '../../services/utilitaires.service';
import { TaskService } from '../../services/task.service';
import { ImportedModule } from '../../shared/modules/imported/imported.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpHeaders, httpResource } from '@angular/common/http';
const authen="wendson1982"
@Component({
  selector: 'app-test-webhook',
  imports: [ImportedModule],
  templateUrl: './test-webhook.component.html',
  styleUrl: './test-webhook.component.scss'
})
export class TestWebhookComponent implements OnInit {
  my_form: FormGroup;
  my_data=signal([])
  constructor(
    private _fb: FormBuilder
  ) {
    this.my_form = this._fb.group({
      surface_terrain: [0, Validators.required],
      surface_batis: [0, Validators.required],
      nombre_F2: [0, Validators.required],
      nombre_F3: [0, Validators.required],
      nombre_F3plus: [0, Validators.required],
      nombre_F4: [0, Validators.required],
      nombre_F4plus: [0, Validators.required],
      superficie_F2: [0, Validators.required],
      superficie_F3: [0, Validators.required],
      superficie_F3plus: [0, Validators.required],
      superficie_F4: [0, Validators.required],
      superficie_F4plus: [0, Validators.required],
    })

  }
  ngOnInit() {

  }

  http_ressources=httpResource<any>(
    ()=>({
      url:"https://n8n.srv1059014.hstgr.cloud/webhook/essais",
      method:"POST",
      body:this.my_data(),
      headers:new HttpHeaders({'Authorization':authen})
    }),

  )
  let_serve = inject(UtilitairesService)
  essai(data: any) {
    this.let_serve.test_webhook(data).subscribe(res => {
      console.log(res)
    })
  }

  onSubmit() {
    if (this.my_form.valid) {
      console.log(this.my_form.value)
      this.my_data.set(this.my_form.value)
    }
  }
}
