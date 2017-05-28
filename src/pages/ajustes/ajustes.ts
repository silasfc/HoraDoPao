import { Component } from '@angular/core';
import {
    NavController,
    ActionSheetController,
    ToastController,
    Platform,
    LoadingController,
    Loading
} from 'ionic-angular';

import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { Storage } from '@ionic/storage';
import { DeviceMotion } from '@ionic-native/device-motion';

declare var cordova: any;

@Component({
    selector: 'page-ajustes',
    templateUrl: 'ajustes.html'
})

export class AjustesPage {
    public takePicture(sourceType) {
        // Create options for the Camera Dialog
        var options = {
            quality: 100,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true
        };

        // Get the data of an image
        this.camera.getPicture(options).then((imagePath) => {
            // Special handling for Android library
            if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
                this.filePath.resolveNativePath(imagePath)
                    .then(filePath => {
                        let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                        let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
                    });
            } else {
                var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
                var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
            }
        }, (err) => {
            this.presentToast('Erro ao tentar selecionar imagem!');
        });
    }

    // Create a new name for the image
    private createFileName() {
        var d = new Date(),
            n = d.getTime(),
            newFileName = n + ".jpg";
        return newFileName;
    }

// Copy the image to a local folder
    private copyFileToLocalDir(namePath, currentName, newFileName) {
        this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
            this.lastImage = newFileName;
            console.log('namepath: ' + namePath + '\n currentName: ' + currentName + '\n newfilename: ' + newFileName)
            this.storage.set('imagemAtual', newFileName);
        }, error => {
            this.presentToast('Erro ao tentar armazenar imagem!');
        });
    }

    private presentToast(text) {
        let toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    }

// Always get the accurate path to your apps folder
    public pathForImage(img) {
        if (img === null) {
            return '';
        } else {
            return cordova.file.dataDirectory + img;
        }
    }

    imagemPadrao: string = 'assets/img/perfil.png';
    imagemAtual: string = null;
    lastImage: string = null;
    loading: Loading;
    private lastX: number;
    private lastY: number;
    private lastZ: number;
    private moveCounter: number = 0;

    constructor(private dm: DeviceMotion, public navCtrl: NavController, private camera: Camera, private transfer: Transfer, private file: File, private filePath: FilePath, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController, private storage: Storage) {
        this.storage.get('imagemAtual').then((val) => {
            console.log("path da imagem do perfil: ", val);
            this.imagemAtual = val ? val : this.imagemAtual;
        });


        platform.ready().then(() => {
            var subscription = this.dm.watchAcceleration({frequency: 200}).subscribe(acc => {
                console.log(acc);

                if (!this.lastX) {
                    this.lastX = acc.x;
                    this.lastY = acc.y;
                    this.lastZ = acc.z;
                    return;
                }

                let deltaX: number, deltaY: number, deltaZ: number;
                deltaX = Math.abs(acc.x - this.lastX);
                deltaY = Math.abs(acc.y - this.lastY);
                deltaZ = Math.abs(acc.z - this.lastZ);

                if (deltaX + deltaY + deltaZ > 3) {
                    this.moveCounter++;
                } else {
                    this.moveCounter = Math.max(0, --this.moveCounter);
                }

                if (this.moveCounter > 4) {
                    console.log('Balangou...');
                    //this.lastImage = this.imagemPadrao;
                    //this.presentToast('Acelerometro sofreu alteração! <br> Valor: ' + this.moveCounter);
                    this.presentActionSheet();
                    this.moveCounter = 0;
                }

                this.lastX = acc.x;
                this.lastY = acc.y;
                this.lastZ = acc.z;

            });
        });


    }

    public presentActionSheet() {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Selecione uma imagem...',
            buttons: [
                {
                    icon: 'image',
                    text: 'Abrir Media',
                    handler: () => {
                        this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
                    }
                },
                {
                    icon: 'camera',
                    text: 'Abrir Camera',
                    handler: () => {
                        this.takePicture(this.camera.PictureSourceType.CAMERA);
                    }
                },
                {
                    text: 'Cancelar',
                    role: 'cancel'
                }
            ]
        });
        actionSheet.present();
    }

}
