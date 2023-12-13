import { initializeApp } from "firebase/app";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import "firebase/storage";
import img from "./img/icon.png";

export class Documents {
  static error() {
    return `
      <form class="mui-form" id="error-form">
        <div class="form-title">Помилка</div>
        <div class="message-error">Ви не зареєстровані у системі</div>
        <button
          type="submit"
          class="mui-btn mui-btn--raised mui-btn--primary"
        >
          Зареєструватися
        </button>
      </form>
    `;
  }

  static create() {
    return `
      <div class="documents">
        <div class="documents-title">Пошук документа</div>
        <form class="mui-form form-search" id="form-search">
          <div class="mui-textfield mui-textfield--float-label search-block">
            <input type="text" id="text" required>
            <label for="text">Назва документа</label>
            <button
              type="submit"
              class="mui-btn mui-btn--raised mui-btn--primary"
              id="btn-search"
            >
              Пошук
            </button>
          </div>
        </form>
        <div id="search-result"></div>
      </div>
    `;
  }

  static renderDocuments() {
    const formSearch = document.querySelector("#form-search");
    const searchResult = document.querySelector("#search-result");

    const formSearchHandler = async (event) => {
      event.preventDefault();

      const form = event.target;
      const documentValue = form.querySelector("#text");
      searchResult.innerHTML = "";

      const firebaseConfig = {
        apiKey: "AIzaSyCdZzGbPtbM_gHcCExxXpfkq0TAfCKU77w",
        authDomain: "task-8a869.firebaseapp.com",
        projectId: "task-8a869",
        storageBucket: "task-8a869.appspot.com",
        messagingSenderId: "356186559265",
        appId: "1:356186559265:web:1ad46f4cd06e6f1e8e6460",
      };

      const app = initializeApp(firebaseConfig);
      const storageRef = getStorage(app);
      const listRef = ref(storageRef, "documents");

      try {
        const res = await listAll(listRef);
        let found = false;

        res.items.forEach(async (itemRef) => {
          const { name } = itemRef;

          if (documentValue.value === name) {
            found = true;
            searchResult.innerHTML = `
              <div class="result">Ось що вдалось знайти</div>
              <a class="doc" href="#">
                <img src='${img}' alt="icon">
                <div>${name}</div>
              </a>
            `;

            documentValue.value = "";
            const link = document.querySelector(".doc");

            link.onclick = async (event) => {
              event.preventDefault();

              try {
                const value = await getDownloadURL(itemRef);

                const a = document.createElement("a");
                a.href = value;
                a.download = name;
                a.click();
              } catch (error) {
                console.error(error);
              }
            };
          }
        });

        if (!found) {
          searchResult.innerHTML =
            '<div class="not-found">Документа не знайдено</div>';
        }
      } catch (error) {
        console.error(error);
      }
    };

    formSearch.addEventListener("submit", formSearchHandler);
  }
}
