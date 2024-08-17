import { UrlState } from "@/context";
import { getClicksForUrl } from "@/db/apiClicks";
import { deleteUrl, getUrl } from "@/db/apiUrls";
import useFetch from "@/hooks/use-fetch";
import { LinkIcon } from "lucide-react";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BarLoader, BeatLoader } from "react-spinners";
import { Copy, Download, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LocationStats from "@/components/LocationStats";
import DeviceStats from "@/components/DeviceStats";

const Link = () => {
  const downloadImage = () => {
    const imageUrl = url?.qr;
    const fileName = url?.title;

    const anchor = document.createElement("a");
    anchor.href = imageUrl;
    anchor.download = fileName;

    document.body.appendChild(anchor);

    anchor.click();

    document.body.removeChild(anchor);
  };
  const { id } = useParams();
  const { user } = UrlState();
  const navigate = useNavigate();

  const {
    loading,
    data: url,
    fn,
    error,
  } = useFetch(getUrl, { id, user_id: user?.id });

  const {
    loading: loadingStats,
    data: stats,
    fn: fnStats,
  } = useFetch(getClicksForUrl, id);

  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, id);

  useEffect(() => {
    fn();
    fnStats();
  }, []);

  if (error) {
    navigate("/dashboard");
  }

  let link = "";
  if (url) {
    link = url?.custom_url ? url?.custom_url : url.short_url;
  }

  return (
    <>
      {(loading || loadingStats) && (
        <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
      )}

      <div className="flex flex-col gap-8 sm:flex-row justify-between">
        <Card className="drop-shadow-md border-2">
          <CardContent className="p-4">
            <div className="flex flex-col items-start gap-8 rounded-lg sm:w-2/5">
              <span className="text-6xl font-extrabold hover:underline cursor-pointer">
                <Card className=" border-emerald-500 border-2">
                  <CardContent>{url?.title}</CardContent>
                </Card>
              </span>
              <a
                href={`https://tiyp.netlify.app/${link}`}
                target="_blank"
                className="text-3xl sm:text-4xl text-blue-400 font-bold hover:underline cursor-pointer"
              >
                https://tiyp.netlify.app/${link}
              </a>
              <a
                href={url?.original_url}
                target="_blank"
                className="flex items-center gap-1 hover:underline cursor-pointer"
              >
                <LinkIcon className="p-1" /> {url?.original_url}
              </a>
              <span className="flex items-end font-extralight text-sm">
                {new Date(url?.created_at).toLocaleString()}
              </span>

              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  onClick={() =>
                    navigator.clipboard.writeText(
                      `https://tiyp.netlify.app/${url?.short_url}`
                    )
                  }
                >
                  <Copy />
                </Button>
                <Button variant="ghost" onClick={downloadImage}>
                  <Download />
                </Button>
                <Button variant="ghost" onClick={() => fnDelete()}>
                  {loadingDelete ? (
                    <BeatLoader size={5} color="red" />
                  ) : (
                    <Trash />
                  )}
                </Button>
              </div>
              <img
                src={url?.qr}
                className="w-full self-center sm:self-start ring ring-blue-500 p-1 object-contain"
                alt="qr code"
              />
            </div>
          </CardContent>
        </Card>
        <Card className="sm:w-3/5">
          <CardHeader>
            <CardTitle className="text-4xl font-extrabold">Analytics</CardTitle>
          </CardHeader>

          {stats && stats.length > 0 ? (
            <CardContent className="flex flex-col gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Total Clicks:</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button className="cursor-none bg-emerald-500">
                    <p className="font-extrabold  inline  text-4xl text-white">
                      {stats?.length}
                    </p>
                  </Button>
                </CardContent>
              </Card>
              <CardTitle>Location Data</CardTitle>
              <LocationStats stats={stats} />

              <CardTitle>Device Info</CardTitle>
              <DeviceStats stats={stats} />
            </CardContent>
          ) : (
            <CardContent>
              <p>{loadingStats ? "Loading Statistics" : "No Statistics yet"}</p>
            </CardContent>
          )}
        </Card>
      </div>
    </>
  );
};

export default Link;
