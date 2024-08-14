import { UrlState } from "@/context";
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Error from "./Error";
import { Card } from "./ui/card";

export const CreateLink = () => {
  const { user } = UrlState();
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button>Create New Link</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl">Create New</DialogTitle>
          </DialogHeader>
          <Input id="title" placeholder="Short Link's Title" />
          <Error message={"Some error"} />
          <Input id="title" placeholder="Enter Your URL" />
          <Error message={"Some error"} />
          <div className="flex items-center gap-2">
            <Card className="p-2"> tinypath.io</Card> /
            <Input id="title" placeholder="Custom Link(Optinal)" />
          </div>
          <Error message={"Some error"} />
          <DialogFooter className="sm:justify-start">
            <Button variant="destructive">Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
