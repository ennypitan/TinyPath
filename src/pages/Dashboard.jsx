import React, { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter } from "lucide-react";
import Error from "@/components/Error";
import useFetch from "@/hooks/use-fetch";
import { UrlState } from "@/context";
import { getClicksForUrls } from "@/db/apiClicks";
import { getUrls } from "@/db/apiUrls";
import LinkCard from "@/components/LinkCard";
import { CreateLink } from "@/components/CreateLink";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { user } = UrlState();
  const {
    loading,
    error,
    data: urls,
    fn: fnUrls,
  } = useFetch(getUrls, user?.id);

  const {
    loading: loadingClicks,
    data: clicks,
    fn: fnClicks,
  } = useFetch(getClicksForUrls, urls ? urls.map((url) => url.id) : []);

  useEffect(() => {
    fnUrls(); // Fetch URLs on mount
  }, []);

  useEffect(() => {
    if (urls && urls.length > 0) {
      fnClicks(); // Fetch clicks only if URLs are available
    }
  }, [urls]);

  const filteredUrls = urls?.filter((url) =>
    url.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8">
      {(loading || loadingClicks) && (
        <BarLoader width={"100%"} color="#36d7b7" />
      )}
      <div className="grid grid-cols-2 gap-4">
        <Card className="drop-shadow-md border-2 border-emerald-500">
          <CardHeader>
            <CardTitle>Links Created:</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="cursor-none bg-emerald-500">
              <p className="font-extrabold  inline  text-4xl text-white">
                {urls?.length}
              </p>
            </Button>
          </CardContent>
        </Card>
        <Card className="drop-shadow-md border-2 border-emerald-500">
          <CardHeader>
            <CardTitle>Total Clicks:</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="cursor-none bg-emerald-500">
              <p className="font-extrabold  inline  text-4xl text-white">
                {clicks?.length}
              </p>
            </Button>
          </CardContent>
        </Card>
      </div>
      <div className=" flex justify-between">
        <h1 className="text-4xl font-extrabold">My Links</h1>
        <Button>
          <CreateLink />
        </Button>
      </div>
      <div className="relative drop-shadow-md">
        <Input
          className="border-2 border-emerald-500"
          type="text"
          placeholder="Filter Links"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
        <Filter className="absolute top-2 right-2 p-1 " />
      </div>
      {error && <Error message={error?.message} />}
      {(filteredUrls || []).map((url, i) => {
        return <LinkCard key={url.id} url={url} fetchUrls={fnUrls} />;
      })}
    </div>
  );
};

export default Dashboard;
