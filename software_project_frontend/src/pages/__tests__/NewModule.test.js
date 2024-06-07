import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

import NewModule from "../NewModule";

jest.mock("axios");
jest.mock("js-cookie", () => ({
  get: jest.fn(),
}));

describe("new module", () => {
  beforeEach(() => {
    Cookies.get.mockImplementation(() => "fakeToken");
  });

  test("render without crashing", () => {
    render(
      <Router>
        <NewModule />
      </Router>
    );
    expect(screen.getByText(/Module Code/i)).toBeInTheDocument();
    expect(screen.getByText(/Module Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Credits/i)).toBeInTheDocument();
  });

  test("update field form correctly", () => {
    render(
      <Router>
        <NewModule />
      </Router>
    );
    const moduleCodeInput = screen.getByPlaceholderText("Module Code");
    const moduleNameInput = screen.getByPlaceholderText("Module Name");
    const creditsInput = screen.getByPlaceholderText("Credits");

    fireEvent.change(moduleCodeInput, { target: { value: "EE1234" } });
    fireEvent.change(moduleNameInput, {
      target: { value: "Computer Engineering" },
    });
    fireEvent.change(creditsInput, { target: { value: "3" } });

    expect(moduleCodeInput.value).toBe("EE1234");
    expect(moduleNameInput.value).toBe("Computer Engineering");
    expect(creditsInput.value).toBe("3");
  });

  test("calls onSubmit when Save button is clicked", async () => {
    axios.post.mockResolvedValue({ data: {} });

    render(
      <Router>
        <NewModule />
      </Router>
    );

    const moduleCodeInput = screen.getByPlaceholderText("Module Code");
    const moduleNameInput = screen.getByPlaceholderText("Module Name");
    const creditsInput = screen.getByPlaceholderText("Credits");
    const saveButton = screen.getByText(/Save/i);

    fireEvent.change(moduleCodeInput, { target: { value: "CS101" } });
    fireEvent.change(moduleNameInput, {
      target: { value: "Computer Science" },
    });
    fireEvent.change(creditsInput, { target: { value: "3" } });

    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:3500/modules",
        {
          modulecode: "CS101",
          modulename: "Computer Science",
          credits: "3",
        },
        {
          headers: {
            Authorization: `Bearer fakeToken`,
          },
        }
      );
    });
  });

  test("handles API call failure", async () => {
    axios.post.mockRejectedValue(new Error("Failed to create module"));

    render(
      <Router>
        <NewModule />
      </Router>
    );

    const moduleCodeInput = screen.getByPlaceholderText("Module Code");
    const moduleNameInput = screen.getByPlaceholderText("Module Name");
    const creditsInput = screen.getByPlaceholderText("Credits");
    const saveButton = screen.getByText(/Save/i);

    fireEvent.change(moduleCodeInput, { target: { value: "EE1234" } });
    fireEvent.change(moduleNameInput, {
      target: { value: "Computer Engineering" },
    });
    fireEvent.change(creditsInput, { target: { value: "3" } });

    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(screen.getByText(/Error creating module:/i)).toBeInTheDocument();
    });
  });
});
