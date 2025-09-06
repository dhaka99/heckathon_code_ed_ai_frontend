import React, { useState } from "react";
import { ROUTES } from "../../../../constants";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { useMemo } from "react";
import { alpha, useTheme } from "@mui/material/styles";
import { Link, useLocation } from "react-router";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Box, Collapse, Typography } from "@mui/material";

const DIVIDER_BACKGROUND_COLOR = "#FFFFFF26";
type SidebarItem = {
  name: string;
  isFolder: boolean;
  link: string;
  isActive: boolean;
};

type SidebarSection = {
  name: string;
  items?: SidebarItem[];
  isFolder: boolean;
  icon?: React.ReactNode | null;
  iconName?: string;
  isOpen: boolean;
  isActive: boolean;
  link?: string;
};

type SidebarSectionProps = {
  section: SidebarSection;
  handleClick: (
    section: SidebarSection,
    type: string,
    item?: SidebarItem
  ) => void;
};
const SidebarSection: React.FC<SidebarSectionProps> = ({
  section,
  handleClick,
}) => {
  const theme = useTheme();
  return (
    <Box>
      <ListItem disablePadding>
        {section.isFolder ? (
          <ListItemButton
            sx={{ padding: "4px" }}
            onClick={() => {
              handleClick(section, section.isFolder ? "folder" : "item");
            }}
          >
            <ListItemIcon>{section.icon}</ListItemIcon>
            <ListItemText>
              <Typography variant="body1SemiBold" color="neutral.main">
                {section.name}
              </Typography>
            </ListItemText>
            {section.isFolder &&
              section.items &&
              section.items.length > 0 &&
              (section.isOpen ? (
                <ExpandLess
                  fontSize="large"
                  sx={{ color: theme.palette.neutral.main }}
                />
              ) : (
                <ExpandMore
                  fontSize="large"
                  sx={{ color: theme.palette.neutral.main }}
                />
              ))}
          </ListItemButton>
        ) : (
          <Link
            key={`item-${section.name}`}
            to={section.link as string}
            style={{ textDecoration: "none", width: "100%" }}
          >
            <ListItemButton
              sx={{
                padding: "8px 16px",
                width: "100%",
                ...(section.isActive
                  ? {
                      backgroundColor: DIVIDER_BACKGROUND_COLOR,
                      borderRadius: 1.5,
                    }
                  : {}),
              }}
              onClick={() => {
                handleClick(section, section.isFolder ? "folder" : "item");
              }}
            >
              {section.icon && <ListItemIcon>{section.icon}</ListItemIcon>}
              <ListItemText>
                <Typography variant="body1" color="neutral.main">
                  {section.name}
                </Typography>
              </ListItemText>
            </ListItemButton>
          </Link>
        )}
      </ListItem>

      {/** Rendering Sidebar Section Items */}
      {section.isFolder && section.items && section.items.length > 0 && (
        <Collapse in={section.isOpen} timeout="auto" unmountOnExit>
          <List component="div">
            {section.items.map((item, itemIndex) => (
              <Link
                key={`item-${itemIndex}`}
                to={item.link}
                style={{ textDecoration: "none" }}
              >
                <ListItemButton
                  onClick={() => handleClick(section, "item", item)}
                  disableRipple
                  sx={{ height: "48px" }}
                >
                  <ListItemText
                    sx={
                      item.isActive
                        ? {
                            paddingTop: 1,
                            paddingBottom: 1,
                            borderRadius: 1.5,
                            backgroundColor: DIVIDER_BACKGROUND_COLOR,
                          }
                        : {}
                    }
                  >
                    <Typography
                      variant="body1"
                      color="neutral.main"
                      paddingLeft={7}
                    >
                      {item.name}
                    </Typography>
                  </ListItemText>
                </ListItemButton>
              </Link>
            ))}
          </List>
        </Collapse>
      )}
    </Box>
  );
};
const Drawer: React.FC = () => {
  const theme = useTheme();
  const location = useLocation();
  const sidebarSectionsSettings: SidebarSection[] = useMemo(
    () => [
      // {
      //   name: "Dashboard",
      //   isFolder: false,
      //   icon: (
      //     <LibraryBooksIcon
      //       fontSize='large'
      //       sx={{ color: theme.palette.neutral.main }}
      //     />
      //   ),
      //   link: "/dashboard",
      //   iconName: "library_books",
      //   isOpen: false,
      //   isActive: false,
      // },
      {
        name: "Quiz",
        isFolder: false,
        link: ROUTES.QUIZ,
        isActive: ROUTES.QUIZ === location.pathname,
        isOpen: false,
        icon: (
          <LibraryBooksIcon
            fontSize="large"
            sx={{ color: theme.palette.neutral.main }}
          />
        ),
      },
    ],
    [location.pathname]
  );
  const [sidebarSections, setSidebarSections] = useState(
    sidebarSectionsSettings
  );
  const handleClick = (
    section: SidebarSection,
    type: string,
    item?: SidebarItem
  ) => {
    if (type === "folder") {
      setSidebarSections((prev) =>
        prev.map((prevSection) => {
          if (prevSection.name === section.name) {
            return {
              ...prevSection,
              isOpen: !prevSection.isOpen,
            };
          }
          return {
            ...prevSection,
            isOpen: false,
          };
        })
      );
    } else if (type === "item") {
      const path = item?.link || section.link;
      setSidebarSections((prev) =>
        prev.map((s) => ({
          ...s,
          isActive: !s.isFolder && s.link === path,
          items: s.items?.map((i) => ({
            ...i,
            isActive: i.link === path,
          })),
        }))
      );
    }
  };
  return (
    <Box
      sx={{
        overflow: "auto",
        background: `linear-gradient(to bottom ,${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
      minWidth={350}
    >
      <List
        sx={{
          background: alpha(theme.palette.primary.main, 0.9),
          border: `1px solid  ${alpha(theme.palette.neutral.main, 0.18)}`,
          borderRadius: 2,
          backdropFilter: "blur(12px)",
        }}
      >
        {sidebarSections.map((section, index) => (
          <SidebarSection
            key={`section-${index}`}
            section={section}
            handleClick={handleClick}
          />
        ))}
      </List>
    </Box>
  );
};

export default Drawer;
