export default class Validation {
    private element: HTMLElement | undefined;

    validField(element: HTMLElement) {
        this.element = element;
        this.checkField();
    }

    /* eslint-disable @typescript-eslint/no-explicit-any */
    validForm(parent: HTMLElement): any {
        if (parent) {
            const request: { [key: string]: string } = {};
            const form = parent.querySelector("form") as HTMLFormElement;
            let isFormValid = true;
            const fields = Array.from(form.querySelectorAll("[name]"));
            fields.forEach((field) => {
                const el = field as HTMLElement;
                this.validField(el);
                if (el.dataset.isValid === "false") {
                    isFormValid = false;
                    return false;
                }
            });
            if (isFormValid) {
                const formData = new FormData(form);
                for (const formDataKey of formData.entries()) {
                    request[formDataKey[0]] = <string>formDataKey[1];
                }
                return request;
            }
        }
    }

    checkField() {
        let isValid;
        const name = (this.element as HTMLInputElement).name;
        switch (name) {
            case "first_name":
            case "second_name":
            case "username":
                isValid = this.validateName();
                break;
            case "login":
                isValid = this.validateLogin();
                break;
            case "email":
                isValid = this.validateEmail();
                break;
            case "password":
            case "newPassword":
            case "oldPassword":
                isValid = this.validatePassword();
                break;
            case "phone":
                isValid = this.validatePhone();
                break;
            case "message":
                isValid = this.validateMessage();
                break;
            default:
                isValid = true;
        }
        (this.element as HTMLInputElement).dataset.isValid = isValid.toString();
    }

    validateEmail(): boolean {
        const child = this.element?.nextElementSibling as HTMLElement;
        child.textContent = "";
        /* eslint no-useless-escape: "error" */
        const regexp = new RegExp(/^([a-zA-Z0-9_.\-+])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z]{2,4})+$/, "gi");
        if (!regexp.test((this.element as HTMLInputElement).value)) {
            child.textContent = "Не валидный email";
            return false;
        }
        return true;
    }

    validatePassword(): boolean {
        const child = this.element?.nextElementSibling as HTMLElement;
        const value: string = (this.element as HTMLInputElement).value;
        const regexp = new RegExp(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z]))/);
        child.textContent = "";
        if  (value.length < 8 || value.length > 40) {
            child.textContent = "Пароль должен содержать от 8 до 40 символов";
            return false;
        }
        if (!regexp.test(value)) {
            child.textContent = "Не корректный пароль";
            return false;
        }
        return true;
    }

    validatePhone(): boolean {
        const child = this.element?.nextElementSibling as HTMLElement;
        const regexp = new RegExp(/^(\+)?(\d){10,14}/);
        child.textContent = "";
        if (!regexp.test((this.element as HTMLInputElement).value)) {
            child.textContent = "Не верный формат номера";
            return false;
        }
        return true;
    }

    validateMessage(): boolean {
        const child = this.element?.nextElementSibling as HTMLElement;
        child.textContent = "";
        if (!(this.element as HTMLTextAreaElement).value.length) {
            child.textContent = "Введите сообщение";
            return false;
        }
        return true;
    }

    validateName(): boolean {
        const value = (this.element as HTMLInputElement).value.trim() as string;
        const child = this.element?.nextElementSibling as HTMLElement;
        child.textContent = "";
        const regExp = new RegExp(/^[а-яА-ЯёЁa-zA-Z-]+$/, "g");
        if (value === "") {
            child.textContent = "Поле не должно быть пустым";
            return false;
        } else if (value[0] !== value[0].toUpperCase()) {
            child.textContent = "Первая буква должна быть заглавной";
            return false;
        } else if (!regExp.test(value)) {
            child.textContent = "Разрешены символы латиницы или кириллицы";
            return false;
        }
        return true;
    }

    validateLogin(): boolean {
        const regexp = new RegExp(/^[a-zA-Z0-9-_]*$/);
        const child = this.element?.nextElementSibling as HTMLElement;
        const value = (this.element as HTMLInputElement).value as string;
        child.textContent = "";
        if (value.length < 3 || value.length > 20) {
            child.textContent = "Логин должен быть от 3 до 20 символов";
            return false;
        } else if (!/[^0-9]/.test(value)) {
            child.textContent = "Логин не может состоять только из чисел";
            return false;
        } else if (value.includes(" ")) {
            child.textContent = "Логин не может содержать пробелы";
        }
        if (!regexp.test(value)) {
            child.textContent = "Не допустимые символы";
            return false;
        }
        return true;
    }
}
