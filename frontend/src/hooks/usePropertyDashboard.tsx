import { useState, useMemo, useEffect } from "react";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import debounce from "lodash/debounce";
import { GET_PROPERTIES, GET_PROPERTY } from "../graphql/queries";
import { useNotification } from "../context/NotificationContext";
import { CREATE_PROPERTY, DELETE_PROPERTY } from "../graphql/mutations";

type Filter = {
  city: string;
  state: string;
  street: string;
  zipCode: string;
};

const usePropertyDashboard = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">("DESC");
  const [filter, setFilter] = useState<Filter>({
    city: "",
    state: "",
    street: "",
    zipCode: "",
  });
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const { showSuccess, showError } = useNotification();

  const { data, loading, error } = useQuery(GET_PROPERTIES, {
    variables: { sortOrder, filter },
  });

  const [property, { data: propertyData }] = useLazyQuery(GET_PROPERTY);
  const [deleteProperty] = useMutation(DELETE_PROPERTY, {
    refetchQueries: [
      { query: GET_PROPERTIES, variables: { sortOrder, filter } },
    ],
    onCompleted: () => {
      showSuccess("Property deleted successfully!");
      setOpenDialog(false);
      setSelectedItem(null);
    },
    onError: (error) => {
      showError(`Error deleting property: ${error.message}`);
      setOpenDialog(false);
      setSelectedItem(null);
    },
  });
  const [createProperty] = useMutation(CREATE_PROPERTY, {
    refetchQueries: [
      { query: GET_PROPERTIES, variables: { sortOrder, filter } },
    ],
    onCompleted: () => {
      showSuccess("Property added successfully!");
      handleCloseSidebar();
    },
    onError: (error) => {
      showError(`Failed to add property: ${error.message}`);
    },
  });

  const handleOpenSidebar = () => setOpenSidebar(true);
  const handleCloseSidebar = () => setOpenSidebar(false);

  const handleSortClick = () => {
    setSortOrder((prevOrder) => (prevOrder === "ASC" ? "DESC" : "ASC"));
  };

  const debouncedSetFilter = useMemo(
    () =>
      debounce((newFilter: Partial<Filter>) => {
        setFilter((prev) => ({ ...prev, ...newFilter }));
      }, 300),
    []
  );

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    debouncedSetFilter({ [name]: value });
  };

  const handleResetFilters = () => {
    setFilter({ city: "", street: "", state: "", zipCode: "" });
  };

  const handleRowClick = (propertyId: string) => {
    property({
      variables: { _id: propertyId },
    });
    setModalOpen(true);
  };

  const handleDeleteClick = (propertyId: string) => {
    if (propertyId) {
      setSelectedItem(propertyId);
      setOpenDialog(true);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedItem(null);
  };

  const handleConfirmDelete = () => {
    if (selectedItem) {
      deleteProperty({ variables: { id: selectedItem } });
    }
  };
  useEffect(() => {
    if (propertyData) {
      setSelectedProperty(propertyData.property);
    }
  }, [propertyData]);

  useEffect(() => {
    return () => {
      debouncedSetFilter.cancel();
    };
  }, [debouncedSetFilter]);

  return {
    openSidebar,
    handleOpenSidebar,
    handleCloseSidebar,
    sortOrder,
    handleSortClick,
    filter,
    handleFilterChange,
    handleResetFilters,
    data,
    loading,
    error,
    handleRowClick,
    modalOpen,
    setModalOpen,
    selectedProperty,
    handleDeleteClick,
    openDialog,
    createProperty,
    handleCloseDialog,
    handleConfirmDelete,
  };
};

export default usePropertyDashboard;
