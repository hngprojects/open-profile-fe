import Link from "next/link";
import { Search, AlertCircle } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Footer from "@/components/layout/Footer";
import { searchProfiles, SearchResult } from "@/api/search/search.service";
import SearchHeader from "./_components/SearchHeader";
import PaginationControls from "./_components/PaginationControls";
import SearchRetryButton from "./_components/SearchRetryButton";

// Next.js App Router enforces searchParams as a Promise in newer versions
type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function SearchPage(props: PageProps) {
  const searchParams = await props.searchParams;

  const q = typeof searchParams.q === "string" ? searchParams.q : "";
  const pageStr =
    typeof searchParams.page === "string" ? searchParams.page : "1";
  const currentPage = Math.max(1, parseInt(pageStr, 10) || 1);
  const limit = 4;

  const queryIsValid = q.trim().length >= 3;
  const isInitialState = q.trim().length === 0;

  let results: SearchResult[] = [];
  let total = 0;
  let isError = false;
  let errorMessage = "";

  if (queryIsValid) {
    try {
      const data = await searchProfiles({
        q: q.trim(),
        page: currentPage,
        limit,
      });
      results = data.results || [];
      total = data.total || 0;
    } catch (e: unknown) {
      isError = true;
      errorMessage = e instanceof Error ? e.message : "Failed to fetch results";
    }
  }

  const totalPages = Math.ceil(total / limit);

  return (
    <main className="text-primary-text bg-background flex min-h-screen flex-col overflow-hidden">
      <Navbar />

      <SearchHeader initialQuery={q} />

      {/* Main Content Area */}
      <div className="bg-background flex-1">
        {isInitialState ? (
          <section className="flex min-h-[440px] items-center justify-center px-4">
            <div className="max-w-[460px] text-center">
              <div className="bg-brand-subtle-bg mx-auto mb-6 flex h-[48px] w-[48px] items-center justify-center rounded-full">
                <Search className="text-link-hover-text" size={24} />
              </div>
              <h2 className="text-primary-text text-[22px] font-semibold">
                Enter a name or username to search
              </h2>
              <p className="text-secondary-text mt-3 text-[16px] leading-[26px]">
                Find freelancers, creators, and builders on Open Profile. Every
                profile is verified and searchable.
              </p>
            </div>
          </section>
        ) : !queryIsValid ? (
          <section className="flex min-h-[440px] items-center justify-center px-4">
            <div className="max-w-[460px] text-center">
              <div className="bg-brand-subtle-bg mx-auto mb-6 flex h-[48px] w-[48px] items-center justify-center rounded-full">
                <Search className="text-link-hover-text" size={24} />
              </div>
              <h2 className="text-primary-text text-[22px] font-semibold">
                Search query is too short
              </h2>
              <p className="text-secondary-text mt-3 text-[16px] leading-[26px]">
                Please enter at least 3 characters to search.
              </p>
            </div>
          </section>
        ) : (
          <section className="mx-auto max-w-[1040px] px-4 py-10 md:py-16">
            {!isError && results.length > 0 && (
              <div className="mb-8">
                <h2 className="text-primary-text text-[20px] font-bold">
                  Search Results
                </h2>
                <p className="text-secondary-text mt-1 text-[14px]">
                  Showing {results.length} of {total}
                </p>
              </div>
            )}

            {isError ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <AlertCircle
                  size={48}
                  className="text-negative-text mb-4 opacity-80"
                />
                <h3 className="text-primary-text text-[20px] font-semibold">
                  Search failed. Please try again.
                </h3>
                <p className="text-secondary-text mt-2 mb-6 max-w-[400px] text-[15px]">
                  {errorMessage}
                </p>
                <SearchRetryButton />
              </div>
            ) : results.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="bg-secondary-bg mx-auto mb-6 flex h-[64px] w-[64px] items-center justify-center rounded-full">
                  <Search className="text-disabled-text" size={32} />
                </div>
                <h3 className="text-primary-text text-[22px] font-semibold">
                  No profiles found for &quot;{q}&quot;.
                </h3>
                <p className="text-secondary-text mt-3 text-[16px]">
                  Try a different name or username.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {results.map((user: SearchResult, index: number) => {
                  const name =
                    user.fullName ||
                    user.name ||
                    user.username ||
                    "Open Profile User";
                  const bio = user.bio || user.title || user.role || "";
                  const slug =
                    user.username ||
                    (user as SearchResult & { slug?: string }).slug;
                  const cardClassName =
                    "group border-secondary-b hover:border-brand-b/40 bg-background block rounded-[12px] border px-4 pt-3 pb-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)]";
                  const key = user.id || user.username || index;

                  const content = (
                    <div className="flex items-start gap-4">
                      <Avatar className="border-secondary-b h-[48px] w-[48px] shrink-0 border">
                        <AvatarImage
                          src={
                            user.photoUrl ||
                            user.profilePicture ||
                            user.profileImage ||
                            user.avatar ||
                            ""
                          }
                        />
                        <AvatarFallback className="bg-brand-hover-bg text-lg font-medium text-white">
                          {name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex min-w-0 flex-1 flex-col">
                        <div>
                          <div className="mt-0.5 flex flex-wrap items-center gap-1.5">
                            <h3 className="text-primary-text group-hover:text-link-hover-text truncate text-[16px] font-bold transition-colors">
                              {name}
                            </h3>
                            <p className="text-secondary-text truncate text-[14px] font-normal">
                              @{user.username}
                            </p>
                          </div>
                          {bio && (
                            <p className="text-secondary-text mt-2 line-clamp-3 text-[13px] leading-relaxed">
                              {bio}
                            </p>
                          )}
                        </div>

                        <div className="mt-4 flex justify-start">
                          <span className="bg-brand-hover-bg inline-flex rounded-[6px] px-4 py-1.5 text-[13px] font-semibold text-white transition-opacity hover:opacity-90">
                            View Profile
                          </span>
                        </div>
                      </div>
                    </div>
                  );

                  return slug ? (
                    <Link href={`/${slug}`} key={key} className={cardClassName}>
                      {content}
                    </Link>
                  ) : (
                    <div key={key} className={cardClassName}>
                      {content}
                    </div>
                  );
                })}
              </div>
            )}

            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              query={q}
            />
          </section>
        )}
      </div>

      <Footer />
    </main>
  );
}
