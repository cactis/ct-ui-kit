
def copy_commend(target)
  excludeString =  ENV['excludeString']
  # p excludeString
  cmd = "rsync -avzhPR --delete * --exclude={#{excludeString}} #{target}"
  p cmd
  cmd
end

target = "/Volumes/RamDisk/amp/node_modules/ct-ui-kit"
copy_commend target

guard :shell do
  watch(%r{src}) {
    %w(amp bootstrap nofriends iFix readus tinyr).each do |app|
      p app
      # ['writus', 'ctnews'].each do |app|
      target = "/Volumes/RamDisk/#{app}/node_modules/ct-ui-kit"
      p target
      if Dir.exists?(target)
        # `open #{target}/node_modules/ct-rn-kit/`
        command = copy_commend("#{target}/")
        `#{command}`
      end
    end


    %w(nofriends/apps/bootstrap ampup/apps/amp writus/apps/readus writus/apps/tinyr iFix/apps/bootstrap).each do |app|
      p app
      # ['writus', 'ctnews'].each do |app|
      target = "~/www/#{app}/node_modules/ct-ui-kit"
      if Dir.exists?(target)
        # `open #{target}/node_modules/ct-rn-kit/`
        command = copy_commend("#{target}/")
        `#{command}`
      end
    end
  }
end
