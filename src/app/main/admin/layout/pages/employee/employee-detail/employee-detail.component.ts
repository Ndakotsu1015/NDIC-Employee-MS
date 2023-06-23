import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Message, ConfirmationService, MessageService } from 'primeng/api';
import { AppLoadingService } from '../../../services/app-loading.service';
import { AppNotificationService } from '../../../services/app-notification.service';
import { EmployeeEndpoint } from 'src/app/api/endpoints/emplyee.endpoint';
import { EmployeeRequest, EmployeeResource, UpdateEmployeeDto } from 'src/app/api/models/employee.model';
import { StateResource } from 'src/app/api/models/state.model';
import { LgaResource } from 'src/app/api/models/lga.model';
import { MaritalStatusResource } from 'src/app/api/models/MaritalStatus.model';
import { FileUploadEndpoint } from 'src/app/api/endpoints/file-upload-endpoint';
import { MaritalStatusEndpoint } from 'src/app/api/endpoints/marital-status.endpoint';
import { StateEndpoint } from 'src/app/api/endpoints/state.end.point';
import { LgaEndpoint } from 'src/app/api/endpoints/lga.endpoint';
import { filePathPrefix, imagePathPrefix } from 'src/app/api/endpoints/api';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {
  id!: '';
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
  uploadedFile?: string;
  uploadedImageName!: string;
  uploadedFileName!: string
  updateMode = false;
  formRequestData: any;
  data: any;

  filePrefix = filePathPrefix;
  imagePrefix = imagePathPrefix;

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
    this.appLoadingService.startLoading('processing');
    this.route.params.subscribe((params) => {

      // console.log('My', params['id'])

      if (params['id']) {
        this.id = params['id'];
        this.employeeEndpoint.singleEmployee(params['id']).subscribe({
          next: (response) => {
            if (response.data) {
              this.data = response.data;
              this.uploadedImage = this.data.image;
            }
            this.appLoadingService.stopLoading();
          },
          error: (error) => {
            this.appLoadingService.stopLoading();
          }
        });
      }
      this.appLoadingService.stopLoading();
    });

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
        console.log('emmp', data)
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

  handleFileInputUploadImage(e: any) {
    console.log('file,,,,,s', e)
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
  editEmployee(data: any) {

    console.log('Data:', data)
    const dob = new Date(data.date_of_birth)
    const formattedDate = dob.getFullYear().toString() + '-' +
      (+dob.getMonth() + 1).toLocaleString('en-US', {
        minimumIntegerDigits: 2, useGrouping: false
      }).toString() + '-' +
      dob.getDate().toLocaleString('en-US', {
        minimumIntegerDigits: 2, useGrouping: false
      }).toString();

    // console.log(this, this.employeeForm.patchValue, ' ', this.uploadedImageName)
    this.employeeFormControls['name'].patchValue(data.name);
    this.employeeFormControls['email'].patchValue(data.email);
    this.employeeFormControls['address'].patchValue(data.address);
    this.employeeFormControls['phone_number'].patchValue(data.phone_number);
    this.employeeFormControls['state_id'].patchValue(data.state_id);
    this.employeeFormControls['local_government_id'].patchValue(data.local_government_id);
    this.employeeFormControls['marital_status_id'].patchValue(data.marital_status_id);
    this.employeeFormControls['date_of_birth'].patchValue(formattedDate);



    this.updateMode = true;

  }
  updateEmployee() {
    const frmData = {
      name: this.employeeFormControls['name'].value,
      email: this.employeeFormControls['email'].value,
      address: this.employeeFormControls['address'].value,
      phone_number: this.employeeFormControls['phone_number'].value,
      state_id: this.employeeFormControls['state_id'].value,
      local_government_id: this.employeeFormControls['local_government_id'].value,
      marital_status_id: this.employeeFormControls['marital_status_id'].value,
      date_of_birth: this.employeeFormControls['date_of_birth'].value,
      image: this.uploadedImageName,
      file: this.uploadedImageName,

    };

    this.formRequestData = frmData;
    this.appLoadingService.startLoading('Proccessing');

    this.employeeEndpoint.updateemployee(this.data.id, this.formRequestData).subscribe({
      next: (response) => {
        this.data = this.formRequestData;

        this.updateMode = false;
        this.employeeForm.reset();
        this.appLoadingService.stopLoading();
        this.appNotificationService.showSuccess({ title: 'success', detail: 'Are you sure you want to update?' });
        this.router.navigate(['admin/pages/employee/detail']);
      },
      error: (err) => {
        this.appLoadingService.stopLoading();
      }

    });

  }
  goBack() {
    return this.router.navigate(['/admin/pages/employee/list']);
  }

  deleteEmployee() {
    this.appLoadingService.startLoading('Proccessing');

    this.employeeEndpoint.delete(this.data.id).subscribe({
      next: (response) => {
        this.appLoadingService.stopLoading()
        return this.router.navigate(['/admin/pages/employee/list']);

        this.appNotificationService.showSuccess({
          title: 'Success',
          detail: 'Record Deleted Successfully!!!'
        });
      },
      error: (error) => {
        this.appLoadingService.stopLoading();

        this.appNotificationService.showError({
          title: 'Error!!!',
          detail: error.error.message
        });
      }
    });



  }

  onUpload(event: any) {

    console.log('my files')
    for (let file of event.files) {
      this.uploadedFiles.push(file);
      const upload = file;

      const formData: FormData = new FormData();
      formData.append('file', file, file.name);

      this.fileUploadEndpoint.fileUpload(formData).subscribe({
        next: (response) => {
          this.uploadedFileName = response.data;
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          this.uploadedFile = filePathPrefix + this.uploadedFileName;
        }
      });
    }

    // this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
  }



}
