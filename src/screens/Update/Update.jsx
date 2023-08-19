import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getFirestore,
  doc,
  addDoc,
  getDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  collection,
  query,
  where,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  faMagnifyingGlass,
  faPaperclip,
  faEyeSlash,
  faEye,
  faArrowUpRightFromSquare,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import app from "../../config/firebase";
import Form from "../../components/form/Form";

import "../../styles/global.css";

function UpdateForm() {
  const { customerId } = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    concessionaire: "",
    hubspotId: "",
    client: "",
    project: "",
    stage: "",
    login: "",
    plan: "",
    isActive: false,
    observations: "",
    password: "",
    confirmPassword: "",
    invoiceFile: null,
  });

  const [errors, setErrors] = useState({
    password: "",
    login: "",
    plan: "",
    hubspotId: "",
    confirmPassword: "",
  });

  const [feedbackMessage, setFeedbackMessage] = useState({
    type: "",
    message: "",
  });

  useEffect(() => {
    async function fetchCustomerData() {
      try {
        const db = getFirestore(app);
        const customerDocRef = doc(db, "customers", customerId);
        const customerDocSnapshot = await getDoc(customerDocRef);

        if (customerDocSnapshot.exists()) {
          const customerData = customerDocSnapshot.data();
          console.log("Customer data from snapshot:", customerData);
          setFormData((prevData) => ({ ...prevData, ...customerData }));
        } else {
          console.log("Customer not found");
        }
      } catch (error) {
        console.log("Error fetching customer data:", error);
        setFeedbackMessage({
          type: "error",
          message:
            "Ocorreu um erro ao buscar informações do cliente. Por favor, tente novamente.",
        });
      }
    }

    fetchCustomerData();
  }, [customerId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileIconClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      invoiceFile: file,
      invoiceFileName: file.name,
    }));
  };

  const handleToggleChange = () => {
    setFormData((prevData) => ({ ...prevData, isActive: !prevData.isActive }));
  };

  const updateCustomer = async () => {
    const validPlans = [
      "Plano Básico",
      "Plano Residencial Completo",
      "Plano Comercial Eficiente",
      "Plano Premium",
      "Plano Personalizado",
    ];

    const { password, confirmPassword, login, plan, hubspotId } = formData;
    const passwordRegex = /^.+$/;
    const loginRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const hubspotIdRegex = /^[a-zA-Z0-9]+$/;

    const newErrors = {
      password:
        !password || !passwordRegex.test(password)
          ? "Inclua a senha do cliente"
          : "",
      confirmPassword:
        password !== confirmPassword ? "As senhas não coincidem." : "",
      login: !login || !loginRegex.test(login) ? "Insira um e-mail válido" : "",
      plan:
        !plan || !validPlans.includes(plan) ? "Escolha um plano válido" : "",
      hubspotId:
        !hubspotId || !hubspotIdRegex.test(hubspotId)
          ? "Digite um HubSpot ID válido."
          : "",
    };

    setErrors(newErrors);

    const isValid = Object.values(newErrors).every((error) => error === "");
    if (!isValid) {
      return;
    }

    try {
      const db = getFirestore(app);
      const customerDocRef = doc(db, "customers", customerId);

      const storage = getStorage();
      let downloadURL = "";

      if (formData.invoiceFile) {
        const invoiceFileRef = ref(
          storage,
          `invoiceFiles/${formData.invoiceFileName}`
        );
        await uploadBytes(invoiceFileRef, formData.invoiceFile);
        downloadURL = await getDownloadURL(invoiceFileRef);
      }

      const { invoiceFile, ...customerData } = formData;

      if (downloadURL) {
        customerData.invoiceFile = downloadURL;
      }

      await updateDoc(customerDocRef, customerData);

      setFeedbackMessage({
        type: "success",
        message: "Dados do cliente atualizados com sucesso.",
      });
    } catch (error) {
      console.log("Error updating customer:", error);
      setFeedbackMessage({
        type: "error",
        message:
          "Ocorreu um erro ao atualizar os dados do cliente. Por favor, tente novamente.",
      });
    }
    console.log("Setting feedback message:", feedbackMessage);
  };

  const deleteCustomer = async () => {
    const hubspotId = formData.hubspotId;

    try {
      const db = getFirestore(app);
      const customersCollection = collection(db, "customers");
      const querySnapshot = await getDocs(
        query(customersCollection, where("hubspotId", "==", hubspotId))
      );

      if (!querySnapshot.empty) {
        const customerDoc = querySnapshot.docs[0];
        await deleteDoc(customerDoc.ref);
        setFeedbackMessage({
          type: "success",
          message: "Cliente excluído com sucesso.",
        });
        setFormData({});
      } else {
        setFeedbackMessage({
          type: "error",
          message: "Nenhum cliente encontrado para o HubSpot ID fornecido.",
        });
      }
    } catch (error) {
      console.log("Error deleting customer:", error);
      setFeedbackMessage({
        type: "error",
        message:
          "Ocorreu um erro ao excluir o cliente. Por favor, tente novamente.",
      });
    }
  };

  const handleHubspotIdSearch = async () => {
    const hubspotId = formData.hubspotId;

    try {
      const db = getFirestore(app);
      const customersCollection = collection(db, "customers");
      const querySnapshot = await getDocs(
        query(customersCollection, where("hubspotId", "==", hubspotId))
      );

      console.log("Query snapshot:", querySnapshot.docs.length);

      if (!querySnapshot.empty) {
        const customerData = querySnapshot.docs[0].data();
        console.log("Customer data:", customerData);

        setFormData((prevData) => ({
          ...prevData,
          concessionaire: customerData.concessionaire,
          client: customerData.client,
          project: customerData.project,
          stage: customerData.stage,
          login: customerData.login,
          plan: customerData.plan,
          isActive: customerData.isActive,
          observations: customerData.observations,
          password: customerData.password,
          confirmPassword: customerData.confirmPassword,
          invoiceFile: customerData.invoiceFile,
        }));
      } else {
        setFeedbackMessage({
          type: "error",
          message: "Nenhum cliente encontrado para o HubSpot ID fornecido.",
        });
      }
    } catch (error) {
      console.log("Error fetching customer data:", error);
      setFeedbackMessage({
        type: "error",
        message:
          "Ocorreu um erro ao buscar informações do cliente. Por favor, tente novamente.",
      });
    }
  };

  const handleRedirectIconClick = () => {
    const invoiceFileUrl = formData.invoiceFile;
    console.log("Invoice File URL:", invoiceFileUrl);
    if (invoiceFileUrl) {
      window.open(invoiceFileUrl, "_blank");
    }
  };

  const handleDelete = async () => {
    const hubspotId = formData.hubspotId;

    try {
      const db = getFirestore(app);
      const customersCollection = collection(db, "customers");
      const querySnapshot = await getDocs(
        query(customersCollection, where("hubspotId", "==", hubspotId))
      );

      if (!querySnapshot.empty) {
        const customerDoc = querySnapshot.docs[0];
        await deleteDoc(customerDoc.ref);
        setFeedbackMessage({
          type: "success",
          message: "Cliente excluído com sucesso.",
        });
        setFormData({});
      } else {
        setFeedbackMessage({
          type: "error",
          message: "Nenhum cliente encontrado para o HubSpot ID fornecido.",
        });
      }
    } catch (error) {
      console.log("Error deleting customer:", error);
      setFeedbackMessage({
        type: "error",
        message:
          "Ocorreu um erro ao excluir o cliente. Por favor, tente novamente.",
      });
    }
  };

  return (
    <div className="">
      <div className="index-form-customer">
        <div className="customer-container">
          <div className="form-group-customer">
            <select
              name="concessionaire"
              value={formData.concessionaire}
              onChange={handleInputChange}
              placeholder="HubSpot ID"
              className={`customer-select ${
                formData.concessionaire ? "valid" : ""
              }`}
            >
              <option value="" disabled hidden style={{ color: "#AFAFAF" }}>
                Concessionária
              </option>
              <option value="CEMIG">CEMIG</option>
              <option value="Coelba">Coelba</option>
              <option value="CPFL">CPFL</option>
              <option value="Enel SP">Enel SP</option>
              <option value="Enel RJ">Enel RJ</option>
              <option value="Light">Light</option>
            </select>
            <FontAwesomeIcon
              icon={faCaretDown}
              onClick={handleInputChange}
              className="concessionaire-selector-icon"
              style={{ cursor: "pointer" }}
            />
          </div>
          <button onClick={updateCustomer}>SALVAR</button>
          <div className="delete-button-box">
            <button onClick={deleteCustomer} style={{ background: "#ff3e31" }}>
              DELETAR
            </button>
          </div>
        </div>

        <div
          className="customer-project-container"
          style={{ animation: "fadeIn 1s" }}
        >
          <div className="form-group-customer">
            <input
              type="text"
              name="hubspotId"
              value={formData.hubspotId}
              onChange={handleInputChange}
              placeholder="HubSpot ID"
            />
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              onClick={handleHubspotIdSearch}
              className="hubspot-search-icon"
            />
            {errors.hubspotId && (
              <span className="error-message">{errors.hubspotId}</span>
            )}
          </div>
          <div className="form-group-customer">
            <input
              type="text"
              name="client"
              value={formData.client}
              onChange={handleInputChange}
              placeholder="Cliente"
            />
          </div>
          <div className="form-group-customer">
            <input
              type="text"
              name="project"
              value={formData.project}
              onChange={handleInputChange}
              placeholder="Projeto"
            />
          </div>
          <div className="form-group-customer">
            <input
              type="text"
              name="stage"
              value={formData.stage}
              onChange={handleInputChange}
              placeholder="Etapa"
            />
          </div>
        </div>

        <div className="customer-lp-container">
          <div className="customer-login-container">
            <div className="form-group-customer">
              <input
                type="text"
                name="login"
                value={formData.login}
                onChange={handleInputChange}
                placeholder="Login"
              />
              {errors.login && (
                <span className="error-message">{errors.login}</span>
              )}
            </div>
            <div className="form-group-customer-grid">
              <div className="form-group-customer">
                <select
                  name="plan"
                  value={formData.plan}
                  onChange={handleInputChange}
                  className={`plan-select ${formData.plan ? "valid" : ""}`}
                >
                  <option value="" disabled hidden style={{ color: "#AFAFAF" }}>
                    Plano
                  </option>
                  <option value="Plano Básico">Plano Básico</option>
                  <option value="Plano Residencial Completo">
                    Plano Residencial Completo
                  </option>
                  <option value="Plano Comercial Eficiente">
                    Plano Comercial Eficiente
                  </option>
                  <option value="Plano Premium">Plano Premium</option>
                  <option value="Plano Personalizado">
                    Plano Personalizado
                  </option>
                </select>
                <FontAwesomeIcon
                  icon={faCaretDown}
                  className="selector-icon"
                  style={{ cursor: "pointer" }}
                />
                {errors.plan && (
                  <span className="error-message">{errors.plan}</span>
                )}
              </div>
              <div className="form-group-customer">
                <label className="toggle-label">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleToggleChange}
                  />
                  <span className="slider"></span>
                  Ativo
                </label>
              </div>
            </div>
            <div className="form-group-customer">
              <textarea
                name="observations"
                value={formData.observations}
                onChange={handleInputChange}
                placeholder="Observações (opcional)"
              />
            </div>
          </div>
          <div className="customer-password-container">
            <div className="form-group-customer">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Senha do Cliente"
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                onClick={() => setShowPassword(!showPassword)}
                className="password-icon"
                style={{ cursor: "pointer" }}
              />
              {errors.password && (
                <span className="error-message">{errors.password}</span>
              )}
            </div>
            <div className="form-group-customer">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirmar Senha"
              />
              <FontAwesomeIcon
                icon={showConfirmPassword ? faEyeSlash : faEye}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="password-icon"
                style={{ cursor: "pointer" }}
              />
              {errors.confirmPassword && (
                <span className="error-message">{errors.confirmPassword}</span>
              )}
            </div>
            <div className="form-group-customer">
              <div className="input-with-icon">
                <FontAwesomeIcon
                  icon={faPaperclip}
                  onClick={handleFileIconClick}
                  className="invoice-icon"
                  style={{ cursor: "pointer" }}
                />
                <FontAwesomeIcon
                  icon={faArrowUpRightFromSquare}
                  onClick={handleRedirectIconClick}
                  className="redirect-icon"
                  style={{ cursor: "pointer" }}
                />
                <input
                  type="file"
                  id="fileInput"
                  name="invoiceFile"
                  onChange={handleFileChange}
                  hidden
                />
                <input
                  type="text"
                  value={formData.invoiceFileName || ""}
                  readOnly
                  placeholder="Fatura de Energia"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`feedback-message ${feedbackMessage.type}`}>
        {feedbackMessage.message}
      </div>
    </div>
  );
}

export default UpdateForm;
