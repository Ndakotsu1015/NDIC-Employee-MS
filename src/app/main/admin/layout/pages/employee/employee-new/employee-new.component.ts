import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { imagePathPrefix } from 'src/app/api/endpoints/api';
import { EmployeeEndpoint } from 'src/app/api/endpoints/emplyee.endpoint';
import { FileUploadEndpoint } from 'src/app/api/endpoints/file-upload-endpoint';
import { LgaEndpoint } from 'src/app/api/endpoints/lga.endpoint';
import { MaritalStatusEndpoint } from 'src/app/api/endpoints/marital-status.endpoint';
import { StateEndpoint } from 'src/app/api/endpoints/state.end.point';
import { MaritalStatusResource } from 'src/app/api/models/MaritalStatus.model';
import { EmployeeResource, EmployeeRequest } from 'src/app/api/models/employee.model';
import { LgaResource } from 'src/app/api/models/lga.model';
import { StateResource } from 'src/app/api/models/state.model';
import { AppLoadingService } from 'src/app/store/services/app-loading.service';
import { AppNotificationService } from 'src/app/store/services/app-notification.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee-new.component.html',
  styleUrls: ['./employee-new.component.scss']
})
export class EmployeeNewComponent implements OnInit {

  employeeForm: FormGroup;
  states: StateResource[] = [];
  lgas: LgaResource[] = [];
  _lgas: LgaResource[] = [];
  employee!: EmployeeResource;
  employeeRequestForm!: EmployeeRequest;
  martitalStatus: MaritalStatusResource[] = [];
  uploadedFiles: any[] = [];
  SelectedImage = Image;

  today = new Date();

  uploadImage?: string;
  uploadedImage?: string;
  uploadedImageName!: string;

  constructor(
    private readonly router: Router,
    private _fb: FormBuilder,
    private employeeEndpoint: EmployeeEndpoint,
    private stateEndpoint: StateEndpoint,
    private lgaEndpoint: LgaEndpoint,
    private maritalStatusEndpoint: MaritalStatusEndpoint,
    private route: ActivatedRoute,
    private appLoadingService: AppLoadingService,
    private appNotificationService: AppNotificationService,
    private fileUploadEndpoint: FileUploadEndpoint

  ) {
    this.employeeForm = this._fb.group({
      name: new FormControl(null, [Validators.required, Validators.pattern(/^\S.*$/)]),
      address: new FormControl(null, [Validators.required, Validators.pattern(/^\S.*$/)]),
      email: new FormControl(null, [Validators.required, Validators.pattern(/^\S.*$/), Validators.email]),
      phone_number: new FormControl(null, [Validators.required, Validators.pattern(/^\S.*$/), Validators.pattern(/^[+234]\d{13}$/)]),
      date_of_birth: new FormControl(null),
      // image: new FormControl(null, [Validators.required, Validators.pattern(/^\S.*$/)]),
      // file: new FormControl(null, [Validators.required, Validators.pattern(/^\S.*$/)]),
      state_id: new FormControl(null, [Validators.required, Validators.pattern(/^\S.*$/)]),
      local_government_id: new FormControl(null, [Validators.required, Validators.pattern(/^\S.*$/)]),
      marital_status_id: new FormControl(null, [Validators.required, Validators.pattern(/^\S.*$/)]),
    });
  }



  ngOnInit(): void {

    this.employeeFormControls['state_id'].valueChanges
      .subscribe({
        next: (stateId: number) => {
          this.lgas = this._lgas.filter(e => e.state_id == stateId)
        }
      });

    this.appLoadingService.startLoading('Loading Data...');
    this.route.data.subscribe({
      next: (data) => {
        this.appLoadingService.stopLoading();
        this.employee = data['employee'];
      }
    });

    this.stateEndpoint.list().subscribe({
      next: (response) => {
        this.states = response.data;
      },
      error: (error) => {
        console.log(error);
      }
    });

    this.lgaEndpoint.list().subscribe({
      next: (response) => {
        this._lgas = response.data;
      },
      error: (error) => {
        console.log(error)
      }
    });

    this.maritalStatusEndpoint.list().subscribe({
      next: (response) => {
        this.martitalStatus = response.data;
      },
      error: (error) => {
        console.log(error)
      }
    });

  }

  back() {
    window.history.back();
  }

  getStateName(stateId: number) {
    if (stateId) {
      const state = this.states.find((item) => item.id === stateId);

      return state?.name
    }
    return '';
  }

  getLGAName(lgaId: number) {
    if (lgaId) {
      const lga = this.lgas.find((item) => item.id === lgaId);

      return lga?.name;
    }
    return '';
  }



  // Form Controls out of ngOnInit
  get employeeFormControls() {
    return this.employeeForm.controls
  }


  // onSubmit() {
  //   const name = this.employeeFormControls['dob'].value;
  //   const phone_number = '+234' + this.employeeFormControls['phone_number'].value;



  // }

  addEmployee() {
    console.log(this, this.employeeForm.value, ' ', this.uploadedImageName)
    const frmData = {
      name: this.employeeFormControls['name'].value,
      phone_number: this.employeeFormControls['phone_number'].value,
      email: this.employeeFormControls['email'].value,
      date_of_birth: this.employeeFormControls['date_of_birth'].value,
      image: this.uploadedImageName,
      file: this.uploadedImageName,
      address: this.employeeFormControls['address'].value,
      state_id: this.employeeFormControls['state_id'].value,
      local_government_id: this.employeeFormControls['local_government_id'].value,
      marital_status_id: this.employeeFormControls['marital_status_id'].value

    };


    console.log('data', frmData)

    this.employeeRequestForm = frmData;

    this.appLoadingService.startLoading('Proccessing');

    this.employeeEndpoint.createemployee(this.employeeRequestForm).subscribe({
      next: (response) => {
        this.appLoadingService.stopLoading();

        this.appNotificationService.showSuccess({
          title: "Success",
          detail: "Employee Record Added Successfully!"
        });
        this.employeeForm.reset();
        this.appLoadingService.stopLoading();


        this.router.navigate(['/admin/pages/employee/new']);

      },
      error: (err) => {
        this.appLoadingService.stopLoading();

        this.appNotificationService.showError({
          title: err.error.message.error,
          detail: err.error.message.message
        })

      }

    });

  }


  handleFileInputUploadImage(e: any) {
    const file = e.target.files[0];
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    this.fileUploadEndpoint.imageUpload(formData).subscribe({
      next: (response) => {
        this.uploadedImageName = response.data;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.uploadedImage = imagePathPrefix + this.uploadedImageName;
      }
    });


  }

  onUpload(event: any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
      console.log('File', file)
    }

    // this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
  }


}
