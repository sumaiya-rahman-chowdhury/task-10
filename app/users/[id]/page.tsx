"use client";
import { useState, useEffect, use } from "react";
import Head from "next/head";
import Link from "next/link";
import { User } from "@/types";

export default function UserDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) return;

      try {
        setIsLoading(true);
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }

        const data: User = await response.json();
        setUser(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Error</h1>
          <p className="text-gray-600 mt-2">{error}</p>
          <Link
            href="/"
            className="mt-4 inline-block px-4 py-2 bg-gray-600-500 text-white rounded-md hover:bg-blue-600"
          >
            Back to Users
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">User Not Found</h1>
          <Link
            href="/"
            className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Back to Users
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>{user.name} - User Details</title>
        <meta name="description" content={`Details for ${user.name}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/"
            className="text-blue-500 hover:text-blue-700 flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Users
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-8">User Details</h1>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Personal Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-4 pb-2 border-b">
                Personal Information
              </h2>

              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-gray-500">Name</div>
                  <div className="text-lg font-medium text-gray-900">
                    {user.name}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-500">
                    Username
                  </div>
                  <div className="text-lg text-gray-900">{user.username}</div>
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-500">Email</div>
                  <div className="text-lg text-gray-900">{user.email}</div>
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-500">Phone</div>
                  <div className="text-lg text-gray-900">{user.phone}</div>
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-500">
                    Website
                  </div>
                  <div className="text-lg text-blue-500 hover:underline">
                    <a
                      href={`http://${user.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {user.website}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-4 pb-2 border-b">
                Address
              </h2>

              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-gray-500">
                    Street
                  </div>
                  <div className="text-lg text-gray-900">
                    {user.address.street}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-500">Suite</div>
                  <div className="text-lg text-gray-900">
                    {user.address.suite}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-500">City</div>
                  <div className="text-lg text-gray-900">
                    {user.address.city}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-500">
                    Zipcode
                  </div>
                  <div className="text-lg text-gray-900">
                    {user.address.zipcode}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-500">
                    Geo Location
                  </div>
                  <div className="text-lg text-gray-900">
                    {user.address.geo.lat}, {user.address.geo.lng}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Company
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="text-sm font-medium text-gray-500">
                  Company Name
                </div>
                <div className="text-lg font-medium text-gray-900">
                  {user.company.name}
                </div>
              </div>

              <div>
                <div className="text-sm font-medium text-gray-500">
                  Catch Phrase
                </div>
                <div className="text-lg text-gray-900">
                  {`"`}{user.company.catchPhrase}{`"`}
                </div>
              </div>

              <div>
                <div className="text-sm font-medium text-gray-500">
                  Business
                </div>
                <div className="text-lg text-gray-900">{user.company.bs}</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
