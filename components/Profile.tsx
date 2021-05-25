import Image from "next/image";
import { Divider } from "antd";

export interface ProfileProps extends React.HTMLAttributes<HTMLDivElement> {
  avatar: React.ReactNode;
  content: React.ReactNode;
}

export interface ProfileAvatarProps {
  src?: string;
}

export interface ProfileContentProps {
  username: string;
  status?: string;
  about?: string;
}

export function ProfileAvatar({ src }: ProfileAvatarProps) {
  return (
    <Image
      src={src ?? "/svg/user.svg"}
      layout="responsive"
      width="full"
      height="full"
    />
  );
}

export function ProfileContent({
  username,
  status,
  about,
}: ProfileContentProps) {
  return (
    <>
      <h2 className="text-2xl font-semibold">{username}</h2>
      <h3 className="text-sm">{status}</h3>
      {about && (
        <div className="h-2/3">
          <Divider className="h-1/12" />
          <div className="h-11/12">
            <h3 className="text-sm text-gray-700">{about}</h3>
          </div>
        </div>
      )}
    </>
  );
}

export function Profile({ avatar, content, ...rest }: ProfileProps) {
  return (
    <div className="flex flex-row gap-x-4" {...rest}>
      <div className="flex flex-col w-1/4 h-1/3 lg:h-full justify-center">
        {avatar}
      </div>
      <div className="flex flex-col w-3/4">{content}</div>
    </div>
  );
}
