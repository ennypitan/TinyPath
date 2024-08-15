import { storeClicks } from "@/db/apiClicks";
import { getLongUrl } from "@/db/apiUrls";
import useFetch from "@/hooks/use-fetch";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";

const RedirectLink = () => {
  const { id } = useParams();

  const { loading, data, fn: fetchLongUrl } = useFetch(getLongUrl, id);

  const { loading: loadingStats, fn: recordClick } = useFetch(storeClicks, {
    id: data?.id,
    originalUrl: data?.original_url,
  });

  useEffect(() => {
    fetchLongUrl();
  }, []);

  useEffect(() => {
    if (!loading && data) {
      recordClick();
      window.location.href = data.original_url; // Redirect to the original URL
    }
  }, [loading, data]);

  if (loading || loadingStats) {
    return (
      <>
        <BarLoader width={"100%"} color="#36d7d7" />
        <br />
        Redirecting
      </>
    );
  }

  return null;
};

export default RedirectLink;
