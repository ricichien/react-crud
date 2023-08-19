import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faPlus,
  faChevronLeft,
  faChevronRight,
  faCheck,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import app from "../../config/firebase";
import "../../styles/global.css";

export default function Customer() {
  const [customerData, setCustomerData] = useState([]);
  const [filter, setFilter] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const pageSize = 6;
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCustomerData() {
      const db = getFirestore(app);
      const customersCollection = collection(db, "customers");
      const querySnapshot = await getDocs(customersCollection);

      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });

      setCustomerData(data);
      setFilteredData(data);
    }

    fetchCustomerData();
  }, []);

  const handleEdit = (customerId) => {
    navigate(`/monitoring/register/edit/${customerId}`);
  };

  const handleDeleteClick = async (customerId) => {
    const shouldDelete = window.confirm(
      "Tem certeza que deseja excluir este cliente?"
    );
    if (!shouldDelete) {
      return;
    }

    const db = getFirestore(app);
    const customerRef = doc(db, "customers", customerId);

    try {
      await deleteDoc(customerRef);
      setFilteredData((prevData) =>
        prevData.filter((customer) => customer.id !== customerId)
      );
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    filterData(event.target.value);
  };

  const filterData = (searchTerm) => {
    let filtered = customerData.filter(
      (customer) =>
        customer.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.concessionaire
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (searchTerm === "active" && customer.isActive) ||
        (searchTerm === "inactive" && !customer.isActive)
    );

    if (sortKey) {
      filtered = applySort(filtered);
    }

    setFilteredData(filtered);
    setCurrentPage(0);
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const pageCount = Math.ceil(filteredData.length / pageSize);

  const startIndex = currentPage * pageSize;
  const endIndex = startIndex + pageSize;
  const visibleData = filteredData.slice(startIndex, endIndex);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
    filterData(filter);
  };

  const getColumnHeaderProps = (key) => {
    return {
      onClick: () => handleSort(key),
      style: {
        cursor: "pointer",
        fontWeight: sortKey === key ? "bold" : "normal",
      },
    };
  };

  const applySort = (data) => {
    return data.sort((a, b) => {
      if (sortKey === "isActive") {
        if (sortOrder === "asc") {
          return a[sortKey] - b[sortKey];
        } else {
          return b[sortKey] - a[sortKey];
        }
      } else {
        const aValue = a[sortKey].toLowerCase();
        const bValue = b[sortKey].toLowerCase();

        if (sortOrder === "asc") {
          return aValue.localeCompare(bValue);
        } else {
          return bValue.localeCompare(aValue);
        }
      }
    });
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 0; i < pageCount; i++) {
      pageNumbers.push(
        <div
          key={i}
          className={`pagination-number ${i === currentPage ? "active" : ""}`}
          onClick={() => handlePageClick({ selected: i })}
        >
          {i + 1}
        </div>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="" style={{ animation: "fadeInUp 1s" }}>
      <div className="filter-box">
        <input
          type="text"
          placeholder="Pesquisar"
          value={filter}
          onChange={handleFilterChange}
        />
        <button onClick={() => filterData(filter)}>Pesquisar</button>
        <button onClick={() => setFilter("")}>Limpar</button>
        <button onClick={() => navigate("/monitoring/register/create")}>
          <FontAwesomeIcon icon={faPlus} /> Novo
        </button>
      </div>
      <div className="table-box">
        <div className="customer-table">
          <table>
            <thead>
              <tr>
                <th {...getColumnHeaderProps("client")}>Cliente</th>
                <th {...getColumnHeaderProps("login")}>Usuário</th>
                <th {...getColumnHeaderProps("concessionaire")}>
                  Concessionária
                </th>
                <th {...getColumnHeaderProps("stage")}>Status</th>
                <th {...getColumnHeaderProps("project")}>Projeto</th>
                <th {...getColumnHeaderProps("isActive")}>Ativo</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {visibleData.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.client}</td>
                  <td>{customer.login}</td>
                  <td>{customer.concessionaire}</td>
                  <td>{customer.stage}</td>
                  <td>{customer.project}</td>
                  <td>
                    {customer.isActive ? (
                      <FontAwesomeIcon
                        icon={faCheck}
                        style={{ color: "#29B16F", fontSize: "20px" }}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faTimes}
                        style={{ color: "#CCCCCC", fontSize: "20px" }}
                      />
                    )}
                  </td>
                  <td>
                    <FontAwesomeIcon
                      icon={faEdit}
                      className="edit-icon"
                      onClick={() => handleEdit(customer.id)}
                    />
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="delete-icon"
                      onClick={() => handleDeleteClick(customer.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination-container">
          <div
            className="pagination-button"
            onClick={() => handlePageClick({ selected: currentPage - 1 })}
            disabled={currentPage === 0}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </div>
          {renderPageNumbers()}
          <div
            className="pagination-button"
            onClick={() => handlePageClick({ selected: currentPage + 1 })}
            disabled={currentPage === pageCount - 1}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        </div>
      </div>
    </div>
  );
}
