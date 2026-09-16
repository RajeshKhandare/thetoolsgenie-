{/* TinyWow-Style 4-Column Tool Cards with Category Tags */}
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pb-20">
            {filteredTools.map((tool: ToolMeta) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="group flex items-start gap-3.5 rounded-2xl border border-zinc-200/90 dark:border-zinc-800/80 bg-white dark:bg-zinc-900 p-4 transition-all hover:shadow-md hover:border-violet-400 dark:hover:border-violet-500 hover:-translate-y-0.5 cursor-pointer"
              >
                {/* Clean Category Icon */}
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-50 dark:bg-zinc-800/80 group-hover:scale-105 transition-transform mt-0.5">
                  {getToolIcon(tool.category)}
                </div>

                {/* Card Info: Title + Category Tag + Description */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs sm:text-sm font-bold truncate text-zinc-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                    {tool.name}
                  </h3>
                  
                  {/* Category Tag (Jaise pehle tha) */}
                  <span className="text-[10px] font-semibold text-violet-600 dark:text-violet-400 block mt-0.5">
                    {tool.category} Tools
                  </span>

                  <p className="mt-1 text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-1">
                    {tool.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
