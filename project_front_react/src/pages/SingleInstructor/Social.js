import React from "react";
import { Link } from "react-router-dom";

export default function Socialprofile({ avatar }) {
  return (
    <div className="d-flex flex-wrap align-items-center justify-content-center mb-5 mt-5 mb-md-3">
      {/* Social */}
      <ul className="list-unstyled list-inline list-social mb-4 mb-md-0 mx-lg-3 order-1 order-md-0 font-size-sm">
        <li className="list-inline-item list-social-item px-2">
          <Link
            to="#"
            className="text-secondary w-36 h-36 shadow-dark-hover d-flex align-items-center justify-content-center rounded-circle border-hover"
          >
            <i className="fab fa-facebook-f"></i>
          </Link>
        </li>
        <li className="list-inline-item list-social-item px-2">
          <Link
            to="#"
            className="text-secondary w-36 h-36 shadow-dark-hover d-flex align-items-center justify-content-center rounded-circle border-hover"
          >
            <i className="fab fa-twitter"></i>
          </Link>
        </li>
        <li className="list-inline-item list-social-item px-2">
          <Link
            to="#"
            className="text-secondary w-36 h-36 shadow-dark-hover d-flex align-items-center justify-content-center rounded-circle border-hover"
          >
            <i className="fab fa-instagram"></i>
          </Link>
        </li>
        <li className="list-inline-item list-social-item px-2">
          <Link
            to="#"
            className="text-secondary w-36 h-36 shadow-dark-hover d-flex align-items-center justify-content-center rounded-circle border-hover"
          >
            <i className="fab fa-linkedin-in"></i>
          </Link>
        </li>
      </ul>
      <div className="border rounded-circle d-inline-block mb-4 mb-md-0 mx-lg-4 order-0">
        <div className="p-4">
          <img
            src={avatar}
            alt="..."
            className="rounded-circle img-fluid"
            width="170"
            height="170"
          />
        </div>
      </div>

      <Link
        to="#"
        className="text-teal fw-medium d-flex align-items-center mx-lg-4 order-1 order-md-0"
      >
        {/* Icon */}
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.0283 6.25C14.3059 6.25 12.9033 4.84833 12.9033 3.125C12.9033 1.40167 14.3059 0 16.0283 0C17.7509 0 19.1533 1.40167 19.1533 3.125C19.1533 4.84833 17.7509 6.25 16.0283 6.25ZM16.0283 1.25C14.995 1.25 14.1533 2.09076 14.1533 3.125C14.1533 4.15924 14.995 5 16.0283 5C17.0616 5 17.9033 4.15924 17.9033 3.125C17.9033 2.09076 17.0616 1.25 16.0283 1.25Z"
            fill="currentColor"
          />
          <path
            d="M16.0283 20C14.3059 20 12.9033 18.5983 12.9033 16.875C12.9033 15.1517 14.3059 13.75 16.0283 13.75C17.7509 13.75 19.1533 15.1517 19.1533 16.875C19.1533 18.5983 17.7509 20 16.0283 20ZM16.0283 15C14.995 15 14.1533 15.8408 14.1533 16.875C14.1533 17.9092 14.995 18.75 16.0283 18.75C17.0616 18.75 17.9033 17.9092 17.9033 16.875C17.9033 15.8408 17.0616 15 16.0283 15Z"
            fill="currentColor"
          />
          <path
            d="M3.94531 13.125C2.22275 13.125 0.820312 11.7233 0.820312 10C0.820312 8.27667 2.22275 6.875 3.94531 6.875C5.66788 6.875 7.07031 8.27667 7.07031 10C7.07031 11.7233 5.66788 13.125 3.94531 13.125ZM3.94531 8.125C2.91199 8.125 2.07031 8.96576 2.07031 10C2.07031 11.0342 2.91199 11.875 3.94531 11.875C4.97864 11.875 5.82031 11.0342 5.82031 10C5.82031 8.96576 4.97864 8.125 3.94531 8.125Z"
            fill="currentColor"
          />
          <path
            d="M6.12066 9.39154C5.90307 9.39154 5.69143 9.27817 5.57729 9.0766C5.40639 8.77661 5.51061 8.39484 5.8106 8.22409L13.5431 3.81568C13.8422 3.64325 14.2247 3.74823 14.3947 4.04914C14.5656 4.34912 14.4614 4.73075 14.1614 4.90164L6.42888 9.30991C6.33138 9.36484 6.22564 9.39154 6.12066 9.39154Z"
            fill="currentColor"
          />
          <path
            d="M13.8524 16.2665C13.7475 16.2665 13.6416 16.2398 13.5441 16.1841L5.81151 11.7757C5.51152 11.6049 5.40745 11.2231 5.5782 10.9232C5.74818 10.6224 6.12996 10.5182 6.42994 10.6899L14.1623 15.0981C14.4623 15.269 14.5665 15.6506 14.3958 15.9506C14.2807 16.1531 14.0691 16.2665 13.8524 16.2665Z"
            fill="currentColor"
          />
        </svg>

        <span className="ms-3">Report this author</span>
      </Link>
    </div>
  );
}
