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

  }
  ngOnInit() {

  }

  //http_ressources=httpResource<any>(
  //  ()=>({
  //    url:"https://n8n.solubtp.com/webhook/essai",
  //    method:"POST",
  //    body:this.my_data(),
  //    headers:new HttpHeaders({'Authorization':authen})
  //  }),

  //)
  let_serve = inject(UtilitairesService)
  essai() {
    this.let_serve.test_webhook({
      'id': '1d8b905142ee47deafe183222252610',
      'message': 'Liste des contrats ?'
    }).subscribe(res => {
      console.log(res)
    })
  }

  onSubmit() {
    if (this.my_form.valid) {
      this.my_data.set(this.my_form.value)
    }
  }
}
