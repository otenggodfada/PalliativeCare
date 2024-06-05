import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

class FirebaseUploadAdapter {
  constructor(loader) {
    this.loader = loader;
    this.storage = getStorage();
  }

  upload() {
    return this.loader.file.then(file =>
      new Promise((resolve, reject) => {
        const storageRef = ref(this.storage, `blogImages/${file.name}_${Date.now()}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          'state_changed',
          snapshot => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
          },
          error => {
            reject(error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve({
              default: downloadURL
            });
          }
        );
      })
    );
  }

  abort() {
    if (this.uploadTask) {
      this.uploadTask.cancel();
    }
  }
}

export default FirebaseUploadAdapter;
