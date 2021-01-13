import React, { useState } from "react";

const CategoryForm = ({
    isEdit,
    category,
    onSubmit,
    isFromTodo,
    closeModal,
}) => {
    const [name, setName] = useState(category ? category.name : "");
    const [description, setDescription] = useState(
        category ? category.description : ""
    );
    const [error, setError] = useState(null);
    const befSubmit = (cat, submitFunc) => {
        //validate
        return cat.name
            ? submitFunc(cat)
            : setError("Category name is required.");
    };
    return (
        <>
            <div className="register__title form__title">
                <span className="heading-primary">
                    {isEdit ? "Edit Category" : "New Category"}
                </span>
                <div className="close-modal category">
                    <i class="fas fa-times" onClick={closeModal}></i>
                </div>
            </div>
            <div className="register__form">
                <form
                    noValidate
                    onSubmit={(e) => {
                        e.preventDefault();
                        befSubmit({ name, description }, onSubmit);
                    }}
                >
                    <div className="mb-3">
                        <label className="form-label">Category name</label>
                        <input
                            placeholder="Enter a category name"
                            value={name}
                            className={
                                "form-control" + (error ? " is-invalid" : "")
                            }
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
                        <div className="invalid-feedback">{error}</div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea
                            value={description}
                            placeholder="(Optional)"
                            className={"form-control"}
                            onChange={(e) => {
                                setDescription(e.target.value);
                            }}
                        />
                    </div>
                    {isFromTodo ? (
                        <button
                            type="button"
                            className="margin-top-med btn-primary"
                            onClick={() =>
                                befSubmit({ name, description }, onSubmit)
                            }
                        >
                            Add Category
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="margin-top-med btn-primary"
                        >
                            {isEdit ? "Confirm Changes" : "Add Category"}
                        </button>
                    )}
                </form>
            </div>
        </>
    );
};

export default CategoryForm;
